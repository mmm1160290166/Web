using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Web;

namespace MZ_CORE
{
    public static class HttpHelper
    {
        private static bool CheckValidationResult(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
        {
            return true;
        }

        /// <summary>  
        /// 创建GET方式的HTTP请求  
        /// </summary>  
        /// <param name="url">请求的URL</param>  
        /// <param name="heads">请求头信息</param>  
        /// <param name="parameters">随同请求GET的参数名称及参数值字典</param>  
        /// <param name="userAgent">请求的客户端浏览器信息，可以为空</param>  
        /// <param name="timeout">请求的超时时间</param>  
        /// <returns></returns>  
        public static HttpWebRequest CreateGetHttpRequest(string url, IDictionary<string, string> headers, NameValueCollection parameters, string userAgent = "", int timeout = 300000)
        {
            if (string.IsNullOrEmpty(url))
            {
                throw new ArgumentNullException("url");
            }
            if (parameters != null && parameters.Count > 0)
            {
                url = url + "?" + parameters.NVCToFormString();
            }
            HttpWebRequest request = WebRequest.Create(url) as HttpWebRequest;
            request.Method = "GET";
            request.ContentType = "charset=utf-8";
            request.UserAgent = (string.IsNullOrEmpty(userAgent)) ? "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)" : userAgent;
            request.Timeout = timeout;
            #region 添加请求头
            if (headers != null && headers.Count > 0)
            {
                foreach (string key in headers.Keys)
                {
                    request.Headers.Set(key, headers[key]);
                }
            }
            #endregion
            return request;
        }

        /// <summary>  
        /// 创建POST方式的HTTP请求  
        /// </summary>  
        /// <param name="url">请求的URL</param>  
        /// <param name="heads">请求头信息</param>  
        /// <param name="parameters">随同请求POST的参数名称及参数值字典</param>  
        /// <param name="userAgent">请求的客户端浏览器信息，可以为空</param>  
        /// <param name="timeout">请求的超时时间</param>  
        /// <returns></returns>  
        public static HttpWebRequest CreatePostHttpRequest(string url, IDictionary<string, string> headers, NameValueCollection parameters, string ContentType = "application/x-www-form-urlencoded;charset=utf-8", string userAgent = "", int timeout = 600000)
        {
            if (string.IsNullOrEmpty(url))
            {
                throw new ArgumentNullException("url");
            }
            HttpWebRequest request = WebRequest.Create(url) as HttpWebRequest;
            request.Method = "POST";
            request.ContentType = ContentType;
            request.UserAgent = (string.IsNullOrEmpty(userAgent)) ? "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)" : userAgent;
            request.Timeout = timeout;
            request.ContentLength = 0;
            #region 发送HTTPS请求  
            if (url.StartsWith("https", StringComparison.OrdinalIgnoreCase))
            {
                ServicePointManager.ServerCertificateValidationCallback = new RemoteCertificateValidationCallback(CheckValidationResult);
                request.ProtocolVersion = HttpVersion.Version10;
            }
            #endregion
            #region 添加请求头
            if (headers != null && headers.Count > 0)
            {
                foreach (string key in headers.Keys)
                {
                    request.Headers.Set(key, headers[key]);
                }
            }
            #endregion
            #region 添加POST数据  
            if (parameters != null && parameters.Count > 0)
            {
                byte[] data = null;
                switch (ContentType)
                {
                    case "application/x-www-form-urlencoded;charset=utf-8":
                        data = Encoding.UTF8.GetBytes(parameters.NVCToFormString());
                        break;
                    case "application/json;charset=utf-8":
                        data = Encoding.UTF8.GetBytes(parameters.NVCToJSONString());
                        break;
                }
                request.ContentLength = data.Length;
                using (Stream stream = request.GetRequestStream())
                {
                    stream.Write(data, 0, data.Length);
                }
            }
            #endregion
            return request;
        }
        
        public static MZ_CORE.token GetToken(string apiurl, string usercode)
        {
            MZ_CORE.token token = MZ_CORE.CacheHelper.GetToken(MZ_CORE.CacheHelper.TokenKey.BPM_P8_TOKEN, usercode);
            if (token != null)
            {
                return token;
            }
            else
            {
                using (HttpWebResponse response = MZ_CORE.HttpHelper.CreateGetHttpRequest(string.Concat(apiurl, "api/account/access_token?usercode=", usercode), null, null, null).GetResponse() as HttpWebResponse)
                {
                    using (Stream sm = response.GetResponseStream())
                    {
                        using (StreamReader sr = new StreamReader(sm, Encoding.UTF8))
                        {
                            token = JsonConvert.DeserializeObject<MZ_CORE.token>(sr.ReadToEnd());
                            token.ExpireTime = MZ_CORE.CacheHelper.GetTimeStamp(DateTime.Now.AddSeconds(int.Parse(ConfigurationManager.AppSettings["RedisTokenTime"])));
                            MZ_CORE.CacheHelper.SetToken(CacheHelper.TokenKey.BPM_P8_TOKEN, usercode, MZ_CORE.Msg.ToJson(token));
                        }
                    }
                }
                return token;
            }
        }

        public static IDictionary<string, string> GetHeader(string apiurl, string usercode, string sessionkey, string method, NameValueCollection parameters)
        {
            string data = "";
            if (parameters != null)
            {
                switch (method)
                {
                    case "GET":
                        data = parameters.NVCToQueryString();
                        break;
                    case "POST":
                        data = parameters.NVCToFormString();
                        break;
                    case "JSON":
                        data = parameters.NVCToJSONString();
                        break;
                }
            }
            //token token = GetToken(apiurl, usercode);
            string timestamp = Convert.ToInt64((DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0)).TotalMilliseconds).ToString();
            string random = new Random(DateTime.Now.Millisecond).Next(0, int.MaxValue).ToString();
            string signature = ApiHelper.GetSignture(timestamp, random, usercode, "", data);
            //string signature = ApiHelper.GetSignture(timestamp, random, usercode, token, data);
            #region 请求头
            IDictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("Pragma", "no-cache");
            //当前请求用户
            headers.Add("usercode", "MZ");
            //headers.Add("usercode", token.UserCode);
            //发起请求时的时间戳（单位：毫秒）
            headers.Add("timestamp", timestamp);
            //随机数
            headers.Add("random", random);
            //当前请求内容的数字签名
            headers.Add("signature", signature);
            //SessionKey
            headers.Add("sessionkey", sessionkey);
            #endregion
            return headers;
        }

        public static HttpWebRequest Get(string apiurl, string action, string usercode, string sessionkey, NameValueCollection parameters)
        {
            if (!string.IsNullOrEmpty(apiurl) && !string.IsNullOrEmpty(action) && !string.IsNullOrEmpty(usercode))
            {
                IDictionary<string, string> headers = GetHeader(apiurl, usercode, sessionkey, "GET", parameters);
                return HttpHelper.CreateGetHttpRequest(string.Concat(apiurl, action), headers, parameters);
            }
            else
            {
                return null;
            }
        }

        public static HttpWebRequest Post(string apiurl, string action, string usercode, string sessionkey, NameValueCollection parameters)
        {
            if (!string.IsNullOrEmpty(apiurl) && !string.IsNullOrEmpty(action) && !string.IsNullOrEmpty(usercode))
            {
                IDictionary<string, string> headers = GetHeader(apiurl, usercode, sessionkey, "POST", parameters);
                return HttpHelper.CreatePostHttpRequest(string.Concat(apiurl, action), headers, parameters);
            }
            else
            {
                return null;
            }
        }

        public static HttpWebRequest PostJson(string apiurl, string action, string usercode, string sessionkey, NameValueCollection parameters)
        {
            if (!string.IsNullOrEmpty(apiurl) && !string.IsNullOrEmpty(action) && !string.IsNullOrEmpty(usercode))
            {
                //把post过来的数据序列化成json格式 作为生成签名的参数
                IDictionary<string, string> headers = GetHeader(apiurl, usercode, sessionkey, "JSON", parameters);
                return HttpHelper.CreatePostHttpRequest(string.Concat(apiurl, action), headers, parameters, "application/json;charset=utf-8");
            }
            else
            {
                return null;
            }
        }

        public static string ReadResponse(HttpWebRequest request)
        {
            try
            {
                using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
                {
                    using (Stream sm = response.GetResponseStream())
                    {
                        using (StreamReader sr = new StreamReader(sm, Encoding.UTF8))
                        {
                            return sr.ReadToEnd();
                        }
                    }
                }
            }
            catch { return null; }
        }

        //POST 参数转换为字符串 并且将值URL编码
        private static string NVCToFormString(this NameValueCollection nvc)
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < nvc.Count; i++)
            {
                if (i != 0)
                {
                    sb.Append("&");
                }
                sb.AppendFormat("{0}={1}", HttpUtility.UrlEncode(nvc.Keys[i]), HttpUtility.UrlEncode(nvc[nvc.Keys[i]]));
            }
            return sb.ToString();
        }

        /// <summary>
        /// 获取Get请求参数
        /// </summary>
        /// <returns></returns>
        public static string NVCToQueryString(this NameValueCollection Query)
        {
            if (Query == null) { return null; }
            //第一步：取出所有get参数
            IDictionary<string, string> parameters = new Dictionary<string, string>();
            for (int f = 0; f < Query.Count; f++)
            {
                string key = Query.Keys[f];
                parameters.Add(key, Query[key]);
            }
            // 第二步：把字典按Key的字母顺序排序
            IDictionary<string, string> sortedParams = new SortedDictionary<string, string>(parameters);
            IEnumerator<KeyValuePair<string, string>> dem = sortedParams.GetEnumerator();
            // 第三步：把所有参数名和参数值串在一起
            StringBuilder query = new StringBuilder();
            while (dem.MoveNext())
            {
                string key = dem.Current.Key;
                string value = dem.Current.Value;
                if (!string.IsNullOrEmpty(key))
                {
                    query.Append(key).Append(value);
                }
            }
            return query.ToString();
        }

        //POST 参数转换为JSON格式字符串 并且将值URL编码
        public static string NVCToJSONString(this NameValueCollection nvc)
        {
            return MZ_CORE.Msg.ToJson(nvc.AllKeys.ToDictionary(k => k, k => HttpUtility.UrlEncode(nvc[k])));
        }



        /// <summary>
        /// 微信网页请求
        /// </summary>
        /// <param name="requestUrl">请求地址URL</param>
        /// <param name="postString">参数信息</param>
        /// <param name="requestMethod">请求模式(POST/GET)</param>
        /// <returns></returns>
        public static string WeiXinWebRequest(string requestUrl, string postString, string requestMethod)
        {
            try
            {
                HttpWebRequest myHttpWebRequest = (HttpWebRequest)WebRequest.Create(requestUrl);
                myHttpWebRequest.Method = "POST";
                if (!string.IsNullOrEmpty(requestMethod))
                    myHttpWebRequest.Method = requestMethod;
                myHttpWebRequest.UserAgent = "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22";
                myHttpWebRequest.ServicePoint.Expect100Continue = false;
                myHttpWebRequest.Timeout = 1000 * 60;
                myHttpWebRequest.ContentType = "application/x-www-form-urlencoded";
                myHttpWebRequest.Proxy = null;

                //提交参数
                if (!string.IsNullOrEmpty(postString))
                {
                    byte[] byteArray = Encoding.UTF8.GetBytes(postString); // 转化
                    myHttpWebRequest.ContentLength = byteArray.Length;

                    //设置HttpWebRequest的CookieContainer为刚才建立的那个myCookieContainer 
                    Stream myRequestStream = myHttpWebRequest.GetRequestStream();
                    myRequestStream.Write(byteArray, 0, byteArray.Length);
                    myRequestStream.Close();
                    //关闭打开对象  
                }
                //新建一个HttpWebResponse 
                HttpWebResponse myHttpWebResponse = (HttpWebResponse)myHttpWebRequest.GetResponse();
                //获取微信的信息
                Stream myResponseStream = myHttpWebResponse.GetResponseStream();
                StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));
                string outdata = myStreamReader.ReadToEnd();
                myStreamReader.Close();
                myResponseStream.Close();
                return outdata;
            }
            catch (Exception ex)
            {
                return "";
            }
        }





    }
}
