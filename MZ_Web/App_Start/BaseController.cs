using System.Text;
using System.Web.Mvc;

namespace BPM.P8
{
    public class BaseController : Controller
    {
        #region 自定义消息页
        public ActionResult ResultMsg(string msg, string js = "top.window.location.href='/login/index';")
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<html>");
            sb.Append("<head>");
            sb.Append("<meta charset='utf-8'>");
            sb.Append("<meta http-equiv='X-UA-Compatible' content='IE=edge'>");
            sb.Append("<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>");
            sb.Append("<title>消息提醒</title>");
            sb.Append(string.Concat("<link href='/nifty/js/common/css/layer/skin/default/layer.css' type='text/css' rel ='stylesheet'>"));
            sb.Append(string.Concat("<script src='/nifty/js/jquery-2.2.4.min.js' type='text/javascript'></script>"));
            sb.Append(string.Concat("<script src='/nifty/js/common/p8.common.js' type='text/javascript'></script>"));
            sb.Append("</head>");
            sb.Append("<body></body>");
            sb.Append("</html>");
            sb.Append("<script type='text/javascript'>");
            sb.Append(string.Concat("top.layer.msg('", msg, "',{icon:0,time:2000},function(){", js, "});"));
            sb.Append("</script>");
            return Content(sb.ToString(), "text/html", Encoding.UTF8);
        }
        #endregion
    }
}