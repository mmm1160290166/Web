using MZ_CORE;
using System;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Script.Serialization;

namespace MZ_API
{
    /// <summary>
    /// Api接口日志
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]

    public class ApiTrackerFilter : ActionFilterAttribute
    {
        private readonly string key = "_thisOnApiActionMonitorLog_";
        public string Action { get; set; }
        public string Modular { get; set; }
        public string Message { get; set; }
        public string LogType { get; set; }
        public string Argument { get; set; }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            string usercode = string.Empty;
            //if (actionContext.Request.Headers.Contains("usercode"))
            //{
            //    usercode = HttpUtility.UrlDecode(actionContext.Request.Headers.GetValues("usercode").FirstOrDefault());
            //}

            //(actionContext.ActionArguments["obj"] as dynamic).Account.ToString()

            if (actionContext.ActionArguments.Count > 0)
            {

                if (actionContext.ActionArguments.ContainsKey("use"))
                {
                    var use = (actionContext.ActionArguments["use"] as P8.DAL.SYSUser);
                    if (use != null)
                    {
                        usercode = use.Account;
                    }
                }
                else if (actionContext.Request.Headers.Contains("usercode"))
                {
                    usercode = HttpUtility.UrlDecode(actionContext.Request.Headers.GetValues("usercode").FirstOrDefault());
                }



            }

            var monLog = new MonitorLog();
            monLog.ExecuteStartTime = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss.ffff", DateTimeFormatInfo.InvariantInfo));
            monLog.UserCode = usercode;
            monLog.ControllerName = actionContext.ActionDescriptor.ControllerDescriptor.ControllerName;
            monLog.ActionName = actionContext.ActionDescriptor.ActionName;
            //var ss = actionContext.ActionDescriptor.ControllerDescriptor.Configuration.MessageHandlers;
            monLog.Message = Message;
            monLog.UserCode = usercode;
            monLog.LogType = LogType == null ? "2" : LogType;//操作日志
            //monLog.UserIP = "127.0.0.1";
            actionContext.Request.Properties[this.key] = monLog;
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            //if (actionExecutedContext.Exception != null)
            //{
            //    string controllerName = string.Format(
            //        "{0}Controller",
            //        actionExecutedContext.ActionContext.ActionDescriptor.ControllerDescriptor.ControllerName);
            //    string actionName = actionExecutedContext.ActionContext.ActionDescriptor.ActionName;
            //    if (actionExecutedContext.Request.Headers.Contains("usercode"))
            //    {
            //        usercode = HttpUtility.UrlDecode(actionExecutedContext.Request.Headers.GetValues("usercode").FirstOrDefault());
            //    }
            //    string errorMsg = string.Format("执行人【{2}】 执行 controller[{0}] 的 action[{1}] 时产生异常", controllerName, actionName,usercode);
            //    string usercode = string.Empty;

            //    Log4netHelper.Error(errorMsg, actionExecutedContext.Exception);
            //    actionExecutedContext.ActionContext.Response = CORE.Msg.ResponseJson(Msg.ToJson(Msg.Result(Msg.RST.ERR, Msg.ICO.ICO_2, actionExecutedContext.Exception.Message)));
            //}




            if (actionExecutedContext.Exception != null)
            {
                base.OnActionExecuted(actionExecutedContext);
                return;
            }


            if (!actionExecutedContext.Request.Properties.ContainsKey(this.key))
            {
                return;
            }

            dynamic a = null;

            if (actionExecutedContext.ActionContext.Response.Content.Headers.ContentType.MediaType == "text/plain")
            {
                a = JsonConvert.DeserializeObject<dynamic>(actionExecutedContext.Response.Content.ReadAsStringAsync().Result);
            }
            else
            {
                // 取得由 API 返回的资料
                a = actionExecutedContext.ActionContext.Response.Content.ReadAsAsync<object>().Result;
            }

            //actionExecutedContext.ActionContext.Response.Content.Headers.ContentType.MediaType



            if (Convert.ToString(a.RST) == "ERR")
                return;

            var monLog = actionExecutedContext.Request.Properties[this.key] as MonitorLog;

            if (monLog != null)
            {
                monLog.ExecuteEndTime = DateTime.Now;
                //monLog.Raw = actionExecutedContext.Request.Content.ReadAsStringAsync().Result;
                //Log4netHelper.Monitor(monLog.GetLogInfo());//写入文件
                if (a.KEY != null)
                {
                    monLog.Message = string.Concat("[操作：", Action, "][操作页面：", Modular, "][受影响记录：", a.KEY, "]");
                }
                Log4netHelper.SQLLogger(monLog);//写入数据库
            }
        }





    }


}