using System.Web;
using System.Web.Mvc;

namespace MZ_Web
{
    public class ActionFilterLogin : ActionFilter
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            #region 验证session
            bool isLogin = false;
            MZ_CORE.Session session = MZ_CORE.CacheHelper.GetSession(MZ_CORE.CacheHelper.GetSession(MZ_CORE.CacheHelper.SessionKey.BPM_P8_SESSION, ref isLogin));
            if (session != null)
            {
                filterContext.Controller.ViewBag.Session = session;
                //获取配置信息 ViewBag.Config["MsgHead"];
                filterContext.Controller.ViewBag.Config = Controllers.LoginController.GetConfig(session.UserCode, session.SessionKey);
                base.OnActionExecuting(filterContext);
            }
            else
            {
                ResultMsg(filterContext, ((isLogin) ? "您的账号已在另一台设备或浏览器登陆" : "未登录或登录超时"));
            }
            #endregion
        }
    }
}