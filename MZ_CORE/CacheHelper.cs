using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;

namespace MZ_CORE
{
    public class CacheHelper
    {
        ///// <summary>
        ///// 获取连接字符串
        ///// </summary>
        //private static readonly string connString = ConfigurationManager.ConnectionStrings["strConn"].ToString();

        //public static IDbConnection CreateConnection()
        //{
        //    return new SqlConnection(connString);
        //}

        //private static int _SessionTime = 0;
        //public static int SessionTime
        //{
        //    get
        //    {
        //        if (_SessionTime == 0)
        //        {
        //            using (IDbConnection conn = CreateConnection())
        //            {
        //                _SessionTime = conn.QuerySingle<int>("select top 1 SessionTime from SYSConfig");
        //            }
        //        }
        //        return _SessionTime;
        //    }
        //}

        //private static int _TokenTime = 0;
        //public static int TokenTime
        //{
        //    get
        //    {
        //        if (_TokenTime == 0)
        //        {
        //            using (IDbConnection conn = CreateConnection())
        //            {
        //                _TokenTime = conn.QuerySingle<int>("select top 1 TokenTime from SYSConfig");
        //            }
        //        }
        //        return _TokenTime;
        //    }
        //}

        private static int SessionTime = int.Parse(ConfigurationManager.AppSettings["RedisSessionTime"]);

        private static int TokenTime = int.Parse(ConfigurationManager.AppSettings["RedisTokenTime"]);

        public enum SessionKey { BPM_P8_SESSION, BPM_P8_API_SESSION, BPM_P8_MOBILE_SESSION, BPM_P8_API_MOBILE_SESSION };

        public enum AuthKey { MVC_AUTH, API_AUTH };

        public enum TokenKey { BPM_P8_TOKEN, BPM_P8_API_TOKEN, BPM_P8_API_WX_TOKEN, BPM_P8_MOBILE_TOKEN, BPM_P8_API_MOBILE_TOKEN };

        /// <summary>  
        /// 获取时间戳  
        /// </summary>  
        /// <returns></returns>  
        public static Int64 GetTimeStamp(DateTime time)
        {
            System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1));
            return (Int64)(time - startTime).TotalMilliseconds;
        }

        /// <summary>
        /// 时间戳转时间
        /// </summary>
        /// <param name="time"></param>
        /// <returns></returns>
        public static string TimeStampToTime(Int64 time)
        {
            System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1));
            return startTime.AddMilliseconds(time).ToString("yyyy-MM-dd HH:mm:ss");
        }

        #region Session
        public static JObject GetSession(SessionKey key, string usercode, string sessionkey, ref bool isLogin)
        {
            if (!string.IsNullOrEmpty(usercode.ToLower()) && !string.IsNullOrEmpty(sessionkey))
            {
                double score = MZ_CORE.RedisHelper.SortedSet_GetItemScore(string.Concat(key.ToString(), "_KEY"), usercode.ToLower());
                if (!double.IsNaN(score) && score > GetTimeStamp(DateTime.Now))
                {
                    string json = MZ_CORE.RedisHelper.Hash_Get(string.Concat(key.ToString(), "_VALUE"), usercode.ToLower());
                    if (!string.IsNullOrEmpty(json))
                    {
                        JObject obj = JObject.Parse(json);
                        object OSKey = (object)obj["SESSION"]["SessionKey"];
                        if (OSKey != null && OSKey.ToString() == sessionkey)
                        {
                            SetSessionTime(key, usercode.ToLower());
                            return obj;
                        }
                        else
                        {
                            isLogin = true;
                        }
                    }
                }
            }
            return null;
        }

        /// <summary>  
        /// 读取某个Session对象值  
        /// </summary>  
        /// <param name="strSessionName">Session对象名称</param>  
        /// <returns>Session对象值</returns>  
        public static object GetSession(string strSessionName)
        {
            if (System.Web.HttpContext.Current.Session[strSessionName] == null)
            {
                return "";
            }
            else
            {
                return System.Web.HttpContext.Current.Session[strSessionName];
            }
        }

        public static MZ_CORE.Session GetSession(JObject obj)
        {
            return (obj != null && (object)obj["SESSION"] != null) ? JsonConvert.DeserializeObject<MZ_CORE.Session>(((object)obj["SESSION"]).ToString()) : null;
        }

        public static JObject GetSession(SessionKey key, ref bool isLogin)
        {
            string sessionkey = MZ_CORE.CookieHelper.GetCookieValue("sessionkey");
            if (!string.IsNullOrEmpty(sessionkey))
            {
                MZ_CORE.Cookie cookie = Newtonsoft.Json.JsonConvert.DeserializeObject<MZ_CORE.Cookie>(sessionkey);
                if (cookie != null)
                {
                    return GetSession(key, cookie.UserCode, cookie.SessionKey, ref isLogin);
                }
            }
            return null;
        }

        public static DataTable GetSession(AuthKey key, JObject obj)
        {
            return (obj != null && (object)obj[key.ToString()] != null) ? JsonConvert.DeserializeObject<DataTable>(((object)obj[key.ToString()]).ToString()) : null;
        }

        #region PC端
        /// <summary>
        /// 查询在线人数
        /// </summary>
        /// <param name="key"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        public static long GetActiveCount(SessionKey key)
        {
            return MZ_CORE.RedisHelper.SortedSet_GetCount(string.Concat(key, "_KEY"), GetTimeStamp(DateTime.Now.AddSeconds(-SessionTime)), GetTimeStamp(DateTime.Now.AddSeconds(SessionTime)));
        }

        /// <summary>
        /// 查询在线人员
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetActiveUser(SessionKey key)
        {
            List<string> list = MZ_CORE.RedisHelper.SortedSet_GetList(string.Concat(key, "_KEY"), GetTimeStamp(DateTime.Now.AddSeconds(-SessionTime)), GetTimeStamp(DateTime.Now.AddSeconds(SessionTime)));
            if (list != null && list.Count > 0)
            {
                return string.Join(",", list.ToArray());
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 获取最后操作时间及会话过期时间
        /// </summary>
        /// <param name="key"></param>
        /// <param name="usercode"></param>
        /// <param name="LastTime"></param>
        /// <param name="ExpireTime"></param>
        public static void GetLastTime(SessionKey key, string usercode, ref string LastTime, ref string ExpireTime)
        {
            double score = MZ_CORE.RedisHelper.SortedSet_GetItemScore(string.Concat(key.ToString(), "_KEY"), usercode.ToLower());
            if (!double.IsNaN(score))
            {
                LastTime = TimeStampToTime(Convert.ToInt64(score - SessionTime * 1000));
                ExpireTime = TimeStampToTime(Convert.ToInt64(score));
            }
        }
        #endregion

        #region 移动端
        /// <summary>
        /// 查询在线人数
        /// </summary>
        /// <param name="key"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        public static long GetActiveCountMobile(SessionKey key)
        {
            return MZ_CORE.RedisHelperMobile.SortedSet_GetCount(string.Concat(key, "_KEY"), GetTimeStamp(DateTime.Now.AddSeconds(-SessionTime)), GetTimeStamp(DateTime.Now.AddSeconds(SessionTime)));
        }

        /// <summary>
        /// 查询在线人员
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetActiveUserMobile(SessionKey key)
        {
            List<string> list = MZ_CORE.RedisHelperMobile.SortedSet_GetList(string.Concat(key, "_KEY"), GetTimeStamp(DateTime.Now.AddSeconds(-SessionTime)), GetTimeStamp(DateTime.Now.AddSeconds(SessionTime)));
            if (list != null && list.Count > 0)
            {
                return string.Join(",", list.ToArray());
            }
            else
            {
                return null;
            }
        }
        #endregion

        /// <summary>
        /// 添加Session
        /// </summary>
        /// <param name="key"></param>
        /// <param name="usercode"></param>
        /// <param name="session"></param>
        public static void SetSession(SessionKey key, string usercode, string session)
        {
            MZ_CORE.RedisHelper.SortedSet_Add(string.Concat(key, "_KEY"), usercode.ToLower(), GetTimeStamp(DateTime.Now.AddSeconds(SessionTime)));
            MZ_CORE.RedisHelper.Hash_Set(string.Concat(key, "_VALUE"), usercode.ToLower(), session);
            ClearSession(key);
        }

        /// <summary>
        /// 设置Session延期
        /// </summary>
        /// <param name="usercode"></param>
        public static void SetSessionTime(SessionKey key, string usercode)
        {
            switch (key)
            {
                case SessionKey.BPM_P8_SESSION:
                case SessionKey.BPM_P8_API_SESSION:
                    MZ_CORE.RedisHelper.SortedSet_Add(string.Concat(SessionKey.BPM_P8_SESSION, "_KEY"), usercode.ToLower(), GetTimeStamp(DateTime.Now.AddSeconds(SessionTime)));
                    MZ_CORE.RedisHelper.SortedSet_Add(string.Concat(SessionKey.BPM_P8_API_SESSION, "_KEY"), usercode.ToLower(), GetTimeStamp(DateTime.Now.AddSeconds(SessionTime)));
                    break;
                case SessionKey.BPM_P8_MOBILE_SESSION:
                case SessionKey.BPM_P8_API_MOBILE_SESSION:
                    MZ_CORE.RedisHelper.SortedSet_Add(string.Concat(SessionKey.BPM_P8_MOBILE_SESSION, "_KEY"), usercode.ToLower(), GetTimeStamp(DateTime.Now.AddSeconds(SessionTime)));
                    MZ_CORE.RedisHelper.SortedSet_Add(string.Concat(SessionKey.BPM_P8_API_MOBILE_SESSION, "_KEY"), usercode.ToLower(), GetTimeStamp(DateTime.Now.AddSeconds(SessionTime)));
                    break;
            }
        }

        /// <summary>
        /// 移除Session
        /// </summary>
        /// <param name="key"></param>
        /// <param name="usercode"></param>
        public static bool RemoveSession(SessionKey key, string usercode)
        {
            try
            {
                if (MZ_CORE.RedisHelper.SortedSet_Remove(string.Concat(key, "_KEY"), usercode.ToLower()) && MZ_CORE.RedisHelper.Hash_Remove(string.Concat(key, "_VALUE"), usercode.ToLower()))
                {
                    return true;
                }
                return false;
            }
            catch { return false; }
        }

        /// <summary>
        /// 清理过期Session
        /// </summary>
        /// <param name="key"></param>
        public static void ClearSession(SessionKey key)
        {
            //当闲置Session超过100条时执行清理
            long num = MZ_CORE.RedisHelper.SortedSet_GetCount(string.Concat(key, "_KEY"), 0, GetTimeStamp(DateTime.Now));
            if (num > 100)
            {
                IDictionary<string, double> dic = MZ_CORE.RedisHelper.SortedSet_GetDictionary(string.Concat(key, "_KEY"), 0, GetTimeStamp(DateTime.Now));
                foreach (KeyValuePair<string, double> entity in dic)
                {
                    RemoveSession(key, entity.Key);
                }
            }
        }
        #endregion

        #region Token
        /// <summary>
        /// 添加token
        /// </summary>
        /// <param name="key"></param>
        /// <param name="usercode"></param>
        /// <param name="token"></param>
        public static void SetToken(TokenKey key, string usercode, string token)
        {
            MZ_CORE.RedisHelper.SortedSet_Add(string.Concat(key, "_KEY"), usercode.ToLower(), GetTimeStamp(DateTime.Now.AddSeconds(TokenTime)));
            MZ_CORE.RedisHelper.Hash_Set(string.Concat(key, "_VALUE"), usercode.ToLower(), token);
            ClearToken(key);
        }

        /// <summary>
        /// 获取token
        /// </summary>
        /// <param name="key"></param>
        /// <param name="usercode"></param>
        /// <returns></returns>
        public static token GetToken(TokenKey key, string usercode)
        {
            double score = MZ_CORE.RedisHelper.SortedSet_GetItemScore(string.Concat(key.ToString(), "_KEY"), usercode.ToLower());
            if (!double.IsNaN(score) && score > GetTimeStamp(DateTime.Now))
            {
                string json = MZ_CORE.RedisHelper.Hash_Get(string.Concat(key.ToString(), "_VALUE"), usercode.ToLower());
                if (!string.IsNullOrEmpty(json))
                {
                    token token = JsonConvert.DeserializeObject<token>(json);
                    if (token != null)
                    {
                        return token;
                    }
                }
            }
            return null;
        }

        /// <summary>
        /// 移除token
        /// </summary>
        /// <param name="key"></param>
        /// <param name="usercode"></param>
        public static bool RemoveToken(TokenKey key, string usercode)
        {
            try
            {
                if (MZ_CORE.RedisHelper.SortedSet_Remove(string.Concat(key, "_KEY"), usercode.ToLower()) && MZ_CORE.RedisHelper.Hash_Remove(string.Concat(key, "_VALUE"), usercode.ToLower()))
                {
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// 清理过期Token
        /// </summary>
        /// <param name="key"></param>
        public static void ClearToken(TokenKey key)
        {
            //当闲置Token超过100条时执行清理
            long num = MZ_CORE.RedisHelper.SortedSet_GetCount(string.Concat(key, "_KEY"), 0, GetTimeStamp(DateTime.Now));
            if (num > 100)
            {
                IDictionary<string, double> dic = MZ_CORE.RedisHelper.SortedSet_GetDictionary(string.Concat(key, "_KEY"), 0, GetTimeStamp(DateTime.Now));
                foreach (KeyValuePair<string, double> entity in dic)
                {
                    RemoveToken(key, entity.Key);
                }
            }
        }
        #endregion
    }
}
