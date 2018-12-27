using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using System.Data;
using Newtonsoft.Json.Linq;

namespace MZ_CORE
{
    public class Msg
    {
        public enum RST { SUC, ERR, EMT };
        /// <summary>
        /// 0 感叹号
        /// 1 勾
        /// 2 叉
        /// 3 问号
        /// 4 锁
        /// 5 哭脸
        /// 6笑脸
        /// </summary>
        public enum ICO { ICO_0, ICO_1, ICO_2, ICO_3, ICO_4, ICO_5, ICO_6 };

        /// <summary>
        /// 主要用于权限验证
        /// </summary>
        /// <param name="RST"></param>
        /// <param name="MSG"></param>
        /// <param name="CALLBACK">默认跳转到登录页</param>
        /// <returns></returns>
        public static object Result(RST RST, string MSG, string CALLBACK = "void(0);")
        {
            Dictionary<string, string> Json = new Dictionary<string, string>();
            Json.Add("RST", RST.ToString());
            Json.Add("MSG", MSG);
            Json.Add("CALLBACK", CALLBACK);
            return Json;
        }

        /// <summary>
        /// 主要用于消息返回
        /// </summary>
        /// <param name="RST"></param>
        /// <param name="ICO"></param>
        /// <param name="MSG"></param>
        /// <param name="CALLBACK"></param>
        /// <returns></returns>
        public static object Result(RST RST, ICO ICO, string MSG, string CALLBACK = "void(0);")
        {
            Dictionary<string, string> Json = new Dictionary<string, string>();
            Json.Add("RST", RST.ToString());
            Json.Add("ICO", Convert.ToInt32(ICO).ToString());
            Json.Add("MSG", MSG);
            Json.Add("CALLBACK", CALLBACK);
            return Json;
        }

        public static object Result<T>(RST RST, ICO ICO, string MSG, T DATA, string CALLBACK = "void(0);")
        {
            Dictionary<string, object> Json = new Dictionary<string, object>();
            Json.Add("RST", RST.ToString());
            Json.Add("ICO", Convert.ToInt32(ICO).ToString());
            Json.Add("MSG", MSG);
            Json.Add("DATA", DATA);
            Json.Add("CALLBACK", CALLBACK);
            return Json;
        }
        public static object ResultLog<T>(RST RST, ICO ICO, string MSG, string KEY, T DATA, string CALLBACK = "void(0);")
        {
            Dictionary<string, object> Json = new Dictionary<string, object>();
            Json.Add("RST", RST.ToString());
            Json.Add("ICO", Convert.ToInt32(ICO).ToString());
            Json.Add("MSG", MSG);
            Json.Add("DATA", DATA);
            Json.Add("KEY", KEY);
            Json.Add("CALLBACK", CALLBACK);
            return Json;
        }

        /// <summary>
        /// 主要用于权限验证
        /// </summary>
        /// <param name="RST"></param>
        /// <param name="MSG"></param>
        /// <param name="CALLBACK">默认跳转到登录页</param>
        /// <returns></returns>
        public static object ResultLog(RST RST, string MSG, string KEY, string CALLBACK = "void(0);")
        {
            Dictionary<string, string> Json = new Dictionary<string, string>();
            Json.Add("RST", RST.ToString());
            Json.Add("MSG", MSG);
            Json.Add("KEY", KEY);
            Json.Add("CALLBACK", CALLBACK);
            return Json;
        }

        public static object ResultLog(RST RST, ICO ICO, string MSG, string KEY, string CALLBACK = "void(0);")
        {
            Dictionary<string, object> Json = new Dictionary<string, object>();
            Json.Add("RST", RST.ToString());
            Json.Add("ICO", Convert.ToInt32(ICO).ToString());
            Json.Add("MSG", MSG);
            Json.Add("KEY", KEY);
            Json.Add("CALLBACK", CALLBACK);
            return Json;
        }


        //对象转json处理空和日期
        public static string ToJson(object json, bool Ignore = true)
        {
            if (json is String || json is Char)
            {
                return json.ToString();
            }
            else
            {
                if (Ignore)
                {
                    return JsonConvert.SerializeObject(json, Formatting.None, new JsonSerializerSettings { DateFormatHandling = DateFormatHandling.MicrosoftDateFormat, DateFormatString = "yyyy-MM-dd HH:mm:ss", NullValueHandling = NullValueHandling.Ignore });
                }
                else
                {
                    return JsonConvert.SerializeObject(json, Formatting.None, new JsonSerializerSettings { DateFormatHandling = DateFormatHandling.MicrosoftDateFormat, DateFormatString = "yyyy-MM-dd HH:mm:ss" });
                }
            }
        }

        public static HttpResponseMessage ResponseJson(string content)
        {
            return new HttpResponseMessage { Content = new StringContent(content, System.Text.Encoding.UTF8, "application/json") };
        }

        public static HttpResponseMessage ResponseText(string content)
        {
            return new HttpResponseMessage { Content = new StringContent(content, System.Text.Encoding.UTF8, "text/plain") };
        }

        public static DataTable JsonToDataTable(string key, JObject obj)
        {
            if (((object)obj[key]).ToString().Trim() != "" && ((object)obj[key]).ToString().Trim() != "{}" && ((object)obj[key]).ToString().Trim() != "[]")
            {
                return (obj != null && (object)obj[key] != null) ? JsonConvert.DeserializeObject<DataTable>(((object)obj[key]).ToString()) : null;
            }
            else
            {
                return null;
            }
        }
    }
}
