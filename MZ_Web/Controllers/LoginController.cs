using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Register.P8;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace MZ_Web.Controllers
{
    public class LoginController : Controller
    {
        public static string SysURL = ConfigurationManager.AppSettings["SysURL"];

        public ActionResult Index()
        {
            return Auth_2();
        }

        public ActionResult Register()
        {
            return View();
        }

        private ActionResult Auth_2()
        {
            #region 记住密码
            ViewData["USERNAME"] = "";
            ViewData["PASSWORD"] = "";
            ViewData["REMEMBER"] = "false";
            string rememberkey = MZ_CORE.CookieHelper.GetCookieValue("rememberkey");
            if (!string.IsNullOrEmpty(rememberkey))
            {
                JObject obj = JObject.Parse(rememberkey);
                ViewData["USERNAME"] = MZ_CORE.Comm.DESDecrypt(((object)obj["USERNAME"]).ToString());
                ViewData["PASSWORD"] = MZ_CORE.Comm.DESDecrypt(((object)obj["PASSWORD"]).ToString());
                ViewData["REMEMBER"] = "true";
            }
            #endregion
            #region 获取当前登录风格
            string loginstyle = "";
            string background = "";
            try
            {
                using (HttpWebResponse responsestyle = MZ_CORE.HttpHelper.CreateGetHttpRequest(string.Concat(SysURL, "api/sysmy/getcurrent"), null, null, null).GetResponse() as HttpWebResponse)
                {
                    using (Stream smstyle = responsestyle.GetResponseStream())
                    {
                        using (StreamReader srstyle = new StreamReader(smstyle, Encoding.UTF8))
                        {
                            string json = srstyle.ReadToEnd();
                            DataTable dt = MZ_CORE.Msg.JsonToDataTable("DATA", JObject.Parse(json));
                            loginstyle = dt.Rows[0]["STYLE"].ToString();
                            background = dt.Rows[0]["BACKGROUND"].ToString();
                        }
                    }
                }
            }
            catch
            {
                loginstyle = "NewPageOne";
                background = "/nifty/img/loginModal/NewPageOne.png";
            }
            if (!string.IsNullOrEmpty(loginstyle))
            {
                loginstyle = loginstyle.ToLower();
                switch (loginstyle)
                {
                    case "pagetwo":
                    case "pagethree":
                    case "pagefour":
                    case "pagefive":
                    case "pagesix":
                    case "pageseven":
                    case "pageeight":
                    case "newpageone":
                    case "newpagetwo":
                    case "newpagethree":
                    case "newpagefour":
                    case "newpagefive":
                    case "newpagesix":
                    case "newpageseven":
                    case "newpageeight":
                        break;
                    default:
                        loginstyle = "newpageone";
                        break;
                }
            }
            else
            {
                loginstyle = "newpageone";
            }
            ViewData["style"] = loginstyle;
            ViewData["background"] = background;
            #endregion
            ViewData["nocache"] = string.Concat("time=", DateTime.Now.ToFileTime());
            return View("Index");
        }

        public ActionResult Unauthorized()
        {
            return View();
        }

        public ActionResult UpLoadLicense()
        {
            string number = RegisterClass.getMNum();
            ViewData["number"] = string.Format(number);
            return View();
        }

        [ActionFilterLogin]
        public ActionResult StyleSet()
        {
            return View();
        }

        [ActionFilterLogin]
        public ActionResult StyleBgSet()
        {
            using (HttpWebResponse responsestyle = MZ_CORE.HttpHelper.CreateGetHttpRequest(string.Concat(SysURL, "api/sysmy/getcurrent"), null, null, null).GetResponse() as HttpWebResponse)
            {
                using (Stream smstyle = responsestyle.GetResponseStream())
                {
                    using (StreamReader srstyle = new StreamReader(smstyle, Encoding.UTF8))
                    {
                        string json = srstyle.ReadToEnd();
                        DataTable dt = MZ_CORE.Msg.JsonToDataTable("DATA", JObject.Parse(json));
                        ViewData["background"] = dt.Rows[0]["BACKGROUND"].ToString();
                    }
                }
            }
            return View();
        }

        public string Upload()
        {
            HttpPostedFileBase file = Request.Files["Filedata"] as HttpPostedFileBase;
            string strDate = DateTime.Now.ToString("yyyyMMdd");
            string uploadPath = Server.MapPath("~\\UploadFile\\file\\" + strDate + "\\");
            string sFile = "";
            if (file != null)
            {
                string ext = System.IO.Path.GetExtension(file.FileName);
                string extFileName = System.IO.Path.GetFileNameWithoutExtension(file.FileName);
                string filename = extFileName + "_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ext;
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }
                file.SaveAs(uploadPath + filename);
                sFile = "/UploadFile/file/" + strDate + "/" + filename;
            }
            return "{\"filename\":\"" + sFile + "\"}";
        }

        public ActionResult StyleEdit()
        {
            ViewData["page"] = "PageOne";
            if (Request.QueryString["page"] != null && Request.QueryString["page"] != "")
            {
                switch (Request.QueryString["page"].ToLower())
                {
                    case "pageone":
                    case "pagetwo":
                    case "pagethree":
                    case "pagefour":
                    case "pagefive":
                    case "pagesix":
                    case "pageseven":
                    case "pageeight":
                    case "newpageone":
                    case "newpagetwo":
                    case "newpagethree":
                    case "newpagefour":
                    case "newpagefive":
                    case "newpagesix":
                    case "newpageseven":
                    case "newpageeight":
                        ViewData["page"] = Request.QueryString["page"];
                        break;
                }
            }
            return View();
        }

        private static bool CheckValidationResult(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
        {
            return true;
        }

        public string DoLogin()
        {
            #region 清空cookie、缓存等信息
            string sessionkey = MZ_CORE.CookieHelper.GetCookieValue("sessionkey");
            if (!string.IsNullOrEmpty(sessionkey))
            {
                MZ_CORE.Cookie cookie = Newtonsoft.Json.JsonConvert.DeserializeObject<MZ_CORE.Cookie>(sessionkey);
                if (cookie != null)
                {
                    MZ_CORE.CacheHelper.RemoveSession(MZ_CORE.CacheHelper.SessionKey.BPM_P8_SESSION, cookie.UserCode);
                }
                MZ_CORE.CookieHelper.ClearCookie("sessionkey");
            }
            #endregion

            string action = string.Empty;
            if (Request.Headers.GetValues("action") != null && Request.Headers.GetValues("action").Count() > 0)
            {
                action = HttpUtility.UrlDecode(Request.Headers.GetValues("action").FirstOrDefault());
                NameValueCollection nvc = new NameValueCollection();
                nvc.Add("Account", Server.UrlDecode(Request.Form["Account"]).ToLower());
                nvc.Add("PWD", Request.Form["PWD"]);
                HttpWebRequest request = MZ_CORE.HttpHelper.CreatePostHttpRequest(string.Concat(SysURL, action), null, nvc);
                using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
                {
                    using (Stream sm = response.GetResponseStream())
                    {
                        using (StreamReader sr = new StreamReader(sm, Encoding.UTF8))
                        {
                            string session_mvc = sr.ReadToEnd();
                            JObject obj = JObject.Parse(session_mvc);
                            if (obj != null)
                            {
                                if (((object)obj["RST"]).ToString() == "SUC")
                                {
                                    MZ_CORE.Session session = JsonConvert.DeserializeObject<MZ_CORE.Session>(((object)obj["SESSION"]).ToString());

                                    //清除token缓存
                                    MZ_CORE.CacheHelper.RemoveToken(MZ_CORE.CacheHelper.TokenKey.BPM_P8_TOKEN, session.UserCode);

                                    MZ_CORE.CacheHelper.SetSession(MZ_CORE.CacheHelper.SessionKey.BPM_P8_SESSION, session.UserCode, MZ_CORE.Msg.ToJson(session_mvc));
                                    MZ_CORE.CookieHelper.SetCookie("sessionkey", string.Concat("{\"UserCode\":\"", session.UserCode, "\",\"SessionKey\":\"", session.SessionKey, "\"}"), Request.Url.Host, DateTime.Now.AddDays(1));

                                    //设置配置信息
                                    GetConfig(session.UserCode, session.SessionKey);
                                    //记住密码
                                    if (Request.Form["Remember"] == "true")
                                    {
                                        MZ_CORE.CookieHelper.SetCookie("rememberkey", string.Concat("{\"USERNAME\":\"", MZ_CORE.Comm.DESEncrypt(Request.Form["Account"].ToLower()), "\",\"PASSWORD\":\"", MZ_CORE.Comm.DESEncrypt(Request.Form["PWD"]), "\"}"), Request.Url.Host, DateTime.Now.AddDays(30));
                                    }
                                    else
                                    {
                                        MZ_CORE.CookieHelper.ClearCookie("rememberkey");
                                    }
                                    return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"", ((object)obj["ICO"]).ToString(), "\",\"MSG\":\"", ((object)obj["MSG"]).ToString(), "\",\"JS\":\"", ((object)obj["JS"]).ToString(), "\"}");
                                }
                                else
                                {
                                    return MZ_CORE.Msg.ToJson(MZ_CORE.Msg.Result(MZ_CORE.Msg.RST.ERR, MZ_CORE.Msg.ICO.ICO_2, ((object)obj["MSG"]).ToString()));
                                }
                            }
                            return MZ_CORE.Msg.ToJson(MZ_CORE.Msg.Result(MZ_CORE.Msg.RST.ERR, MZ_CORE.Msg.ICO.ICO_2, "登录失败"));
                        }
                    }
                }
            }
            else
            {
                return MZ_CORE.Msg.ToJson(MZ_CORE.Msg.Result(MZ_CORE.Msg.RST.ERR, "参数错误"));
            }
        }


        public string GetInternetTime()
        {
            string action = string.Empty;
            if (Request.Headers.GetValues("action") != null && Request.Headers.GetValues("action").Count() > 0)
            {
                action = HttpUtility.UrlDecode(Request.Headers.GetValues("action").FirstOrDefault());
                NameValueCollection nvc = new NameValueCollection();
                HttpWebRequest request = MZ_CORE.HttpHelper.CreateGetHttpRequest(string.Concat(SysURL, action), null, nvc);
                using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
                {
                    using (Stream sm = response.GetResponseStream())
                    {
                        using (StreamReader sr = new StreamReader(sm, Encoding.UTF8))
                        {
                            string session_mvc = sr.ReadToEnd();
                            if (session_mvc != null)
                            {
                                Dictionary<string, string> Json = new Dictionary<string, string>();
                                Json.Add("RST", "SUC");
                                Json.Add("Date", session_mvc);
                                return MZ_CORE.Msg.ToJson(Json);

                            }
                            else
                            {
                                return MZ_CORE.Msg.ToJson(MZ_CORE.Msg.RST.ERR);
                            }
                        }
                    }
                }
            }
            else
            {
                return MZ_CORE.Msg.ToJson(MZ_CORE.Msg.Result(MZ_CORE.Msg.RST.ERR, "获取网络时间失败!"));
            }
        }

        //获取配置信息
        public static Dictionary<string, string> GetConfig(string usercode, string sessionkey)
        {
            Dictionary<string, string> config = MZ_CORE.RedisHelper.Item_Get<Dictionary<string, string>>("configkey") as Dictionary<string, string>;
            if (config != null && config.Count > 0)
            {
                return config;
            }
            else
            {
                HttpWebRequest request = MZ_CORE.HttpHelper.Get(SysURL, "api/sysml/getall", usercode, sessionkey, null);
                using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
                {
                    using (Stream sm = response.GetResponseStream())
                    {
                        using (StreamReader sr = new StreamReader(sm, Encoding.UTF8))
                        {
                            string json = sr.ReadToEnd();
                            config = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
                            MZ_CORE.RedisHelper.Item_Set("configkey", config, DateTime.Now.AddDays(1));
                            return config;
                        }
                    }
                }
            }
        }
    }
}