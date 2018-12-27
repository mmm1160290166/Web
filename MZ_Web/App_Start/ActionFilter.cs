using System.Text;
using System.Web.Mvc;

namespace MZ_Web
{
    public class ActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
        }

        #region 自定义消息页
        public void ResultMsg(ActionExecutingContext filterContext, string msg, string js = "top.window.location.href='/login/index';")
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
            filterContext.Result = new ContentResult() { Content = sb.ToString(), ContentEncoding = Encoding.UTF8, ContentType = "text/html" };
        }

        public void ResultUnAuth(ActionExecutingContext filterContext)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<html>");
            sb.Append("<head>");
            sb.Append("<meta charset='utf-8'>");
            sb.Append("<meta http-equiv='X-UA-Compatible' content='IE=edge'>");
            sb.Append("<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>");
            sb.Append("<title>没有访问权限</title>");
            sb.Append(string.Concat("<link href='/nifty/css/bootstrap.css' type='text/css' rel ='stylesheet'>"));
            sb.Append(string.Concat("<link href='/nifty/css/nifty.min.css' type='text/css' rel ='stylesheet'>"));
            sb.Append(string.Concat("<link href='/nifty/js/common/css/layer/skin/default/layer.css' type='text/css' rel ='stylesheet'>"));
            sb.Append(string.Concat("<script src='/nifty/js/jquery-2.2.4.min.js' type='text/javascript'></script>"));
            sb.Append(string.Concat("<script src='/nifty/js/common/p8.common.js' type='text/javascript'></script>"));
            sb.Append("<style type='text/css'>");
            sb.Append("    * {");
            sb.Append("        margin: 0;");
            sb.Append("        padding: 0;");
            sb.Append("    }");
            sb.Append("    html {");
            sb.Append("        height: 100%;");
            sb.Append("        width: 100%;");
            sb.Append("    }");
            sb.Append("    body {");
            sb.Append("        height: 100%;");
            sb.Append("        display: flex;");
            sb.Append("        justify-content: center;");
            sb.Append("        align-items: center;");
            sb.Append("    }");
            sb.Append("    .center_xml {");
            sb.Append("        width: 100%;");
            sb.Append("        height: 100%;");
            sb.Append("        background-color: #f7f7f8;");
            sb.Append("        box-shadow: inset 0 0 600px 300px #c8c8c8;");
            sb.Append("        display: flex;");
            sb.Append("        justify-content: center;");
            sb.Append("        align-items: center;");
            sb.Append("        text-align: center;");
            sb.Append("    }");
            sb.Append("    .middle_xml h1 {");
            sb.Append("        font-family: 'Microsoft YaHei';");
            sb.Append("        font-size: 24px;");
            sb.Append("        color: #565656;");
            sb.Append("        padding-top: 50px;");
            sb.Append("    }");
            sb.Append("</style>");
            sb.Append("</head>");
            sb.Append("<body class='pace-done'>");
            sb.Append("<div class='pace pace-inactive'>");
            sb.Append("    <div class='pace-progress' data-progress-text='100%' data-progress='99' style='width:100%;'>");
            sb.Append("        <div class='pace-progress-inner'></div>");
            sb.Append("    </div>");
            sb.Append("    <div class='pace-activity'></div>");
            sb.Append("</div>");
            sb.Append("<div class='center_xml'>");
            sb.Append("    <div class='middle_xml'>");
            sb.Append(string.Concat("        <img src = '/nifty/img/tishi.png'>"));
            sb.Append("        <h1>抱歉...您当前没有访问权限！</h1>");
            sb.Append("    </div>");
            sb.Append("</div>");
            sb.Append("</body>");
            sb.Append("</html>");
            sb.Append("<script type='text/javascript'>");
            sb.Append("$(function(){var index=parent.layer.getFrameIndex(window.name);if(index!=undefined){setTimeout(function(){parent.layer.close(index);},2000);}});");
            sb.Append("</script>");
            filterContext.Result = new ContentResult() { Content = sb.ToString(), ContentEncoding = Encoding.UTF8, ContentType = "text/html" };
        }
        #endregion
    }
}