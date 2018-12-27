using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace MZ_Web.Controllers
{

    public class AjaxController : Controller
    {
        public static string SysURL = ConfigurationManager.AppSettings["SysURL"];

        //GET 请求
        public string Get()
        {
            string action = string.Empty;
            string usercode = string.Empty;
            if (Request.Headers.GetValues("action") != null && Request.Headers.GetValues("action").Count() > 0 && Request.Headers.GetValues("usercode") != null && Request.Headers.GetValues("usercode").Count() > 0)
            {
                action = HttpUtility.UrlDecode(Request.Headers.GetValues("action").FirstOrDefault());
                usercode = HttpUtility.UrlDecode(Request.Headers.GetValues("usercode").FirstOrDefault());
                HttpWebRequest request = MZ_CORE.HttpHelper.Get(SysURL, action, usercode, "", Request.QueryString);
                return MZ_CORE.HttpHelper.ReadResponse(request);
            }
            else
            {
                return MZ_CORE.Msg.ToJson(MZ_CORE.Msg.Result(MZ_CORE.Msg.RST.ERR, "参数错误"));
            }
        }

        //POST请求
        public string Post()
        {
            string action = string.Empty;
            string usercode = string.Empty;
            if (Request.Headers.GetValues("action") != null && Request.Headers.GetValues("action").Count() > 0 && Request.Headers.GetValues("usercode") != null && Request.Headers.GetValues("usercode").Count() > 0)
            {
                action = HttpUtility.UrlDecode(Request.Headers.GetValues("action").FirstOrDefault());
                usercode = HttpUtility.UrlDecode(Request.Headers.GetValues("usercode").FirstOrDefault());
                HttpWebRequest request = MZ_CORE.HttpHelper.Post(SysURL, action, usercode, "", Request.Form);
                return MZ_CORE.HttpHelper.ReadResponse(request);
            }
            else
            {
                return MZ_CORE.Msg.ToJson(MZ_CORE.Msg.Result(MZ_CORE.Msg.RST.ERR, "参数错误"));
            }
        }

        //POST请求动态传参
        public string PostJson()
        {
            string action = string.Empty;
            string usercode = string.Empty;
            if (Request.Headers.GetValues("action") != null && Request.Headers.GetValues("action").Count() > 0 && Request.Headers.GetValues("usercode") != null && Request.Headers.GetValues("usercode").Count() > 0)
            {
                action = HttpUtility.UrlDecode(Request.Headers.GetValues("action").FirstOrDefault());
                usercode = HttpUtility.UrlDecode(Request.Headers.GetValues("usercode").FirstOrDefault());
                HttpWebRequest request = MZ_CORE.HttpHelper.PostJson(SysURL, action, usercode, "", Request.Form);
                return MZ_CORE.HttpHelper.ReadResponse(request);
            }
            else
            {
                return MZ_CORE.Msg.ToJson(MZ_CORE.Msg.Result(MZ_CORE.Msg.RST.ERR, "参数错误"));
            }
        }
    }
}