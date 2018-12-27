using MZ_CORE;
using System;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;

namespace MZ_API
{
    [AttributeUsage(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    public class ApiExecptionAttrbute : ExceptionFilterAttribute
    {
        //public static Queue<Exception> ExceptionQueue = new Queue<Exception>();//创建队列.  
        public override void OnException(HttpActionExecutedContext filterContext)
        {
            var usercode = "";
            string controllerName = filterContext.ActionContext.ActionDescriptor.ControllerDescriptor.ControllerName;
            string actionName = filterContext.ActionContext.ActionDescriptor.ActionName;
            if (filterContext.Request.Headers.Contains("usercode"))
            {
                usercode = HttpUtility.UrlDecode(filterContext.Request.Headers.GetValues("usercode").FirstOrDefault());
            }



            string errorMsg = string.Format("执行人【{2}】 执行 controller[{0}] 的 action[{1}] 时产生异常", controllerName, actionName, usercode);
            Log4netHelper.Error(errorMsg, filterContext.Exception);
            var monLog = new MonitorLog();
            monLog.ExecuteStartTime = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss.ffff", DateTimeFormatInfo.InvariantInfo));
            monLog.UserCode = usercode;
            monLog.ControllerName = controllerName;
            monLog.ActionName = actionName;
            monLog.LogType = "3";//错误日志
            //var ss = actionContext.ActionDescriptor.ControllerDescriptor.Configuration.MessageHandlers;
            monLog.Message = errorMsg + filterContext.Exception.Message; 
            monLog.UserCode = usercode;
            Log4netHelper.SQLLogger(monLog);

            filterContext.ActionContext.Response = CORE.Msg.ResponseJson(Msg.ToJson(Msg.Result(Msg.RST.ERR, Msg.ICO.ICO_2, filterContext.Exception.Message)));

            //string errorMsg = string.Format("执行人【{2}】 执行 controller[{0}] 的 action[{1}] 时产生异常", controllerName, actionName, usercode);
            //LogManager.GetLogger("LogExceptionAttribute").Error(string.Format(msgTemplate, controllerName, actionName), filterContext.Exception);

            base.OnException(filterContext);
        }

    }
}