using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MZ_DAL;

namespace MZ_API.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        /// <summary>
        /// 验证帐号是否可用
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [Route("CheckUserName"), AcceptVerbs("POST")]
        public HttpResponseMessage CheckCode(dynamic obj)
        {
            return MZ_CORE.Msg.ResponseJson(new T_USERService().CheckUserName(obj));
        }

        /// <summary>
        /// 新增用户信息
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [Route("Add"), AcceptVerbs("POST")]
        public HttpResponseMessage Add(T_USER obj)
        {
            return MZ_CORE.Msg.ResponseJson(new T_USERService().Add(obj));
        }

        [Route("LoginOn"), AcceptVerbs("POST")]
        public HttpResponseMessage Login(MZ_DAL.T_USER use)
        {
            if (string.IsNullOrEmpty(use.USERNAME) || string.IsNullOrEmpty(use.PASSWORD))
            {
                return MZ_CORE.Msg.ResponseJson(MZ_CORE.Msg.ToJson(MZ_CORE.Msg.Result(MZ_CORE.Msg.RST.ERR, "用户名和密码不能为空")));
            }
            else
            {
                MZ_DAL.T_USER user = new MZ_DAL.T_USERService().GetUser(use.USERNAME);
                //验证账号
                if (user == null)
                {
                    return MZ_CORE.Msg.ResponseJson(MZ_CORE.Msg.ToJson(MZ_CORE.Msg.Result(MZ_CORE.Msg.RST.ERR, "账户不存在")));
                }
                //验证密码
                else if (!string.Equals(user.PASSWORD, MZ_CORE.Comm.Md5(use.PASSWORD)))
                {
                    return MZ_CORE.Msg.ResponseJson(MZ_CORE.Msg.ToJson(MZ_CORE.Msg.Result(MZ_CORE.Msg.RST.ERR, "密码错误")));
                }
                else
                {
                    #region 获取Session
                    MZ_CORE.Session session = new MZ_CORE.Session()
                    {
                        SessionKey = MZ_CORE.Comm.GetMd5Hash(string.Concat(user.USERNAME, DateTime.Now, Guid.NewGuid())),
                        UserCode = user.USERNAME,
                        UserPwd = user.PASSWORD,
                        TenantID = "ZD",
                        DisplayName = user.DISPLAYNAME,
                    };
                    string json_session = MZ_CORE.Msg.ToJson(session);
                    string json_session_mvc = string.Concat("{\"RST\":\"SUC\",\"ICO\":\"", ((user.PASSWORD == "e10adc3949ba59abbe56e057f20f883e") ? "4" : "1"), "\",\"MSG\":\"", ((user.PASSWORD == "e10adc3949ba59abbe56e057f20f883e") ? "请修改初始密码" : "登录成功"), "\",\"JS\":\"", ((user.PASSWORD == "e10adc3949ba59abbe56e057f20f883e") ? "UpdatePWD();" : "window.location.href='/usercenter/index';"), "\",\"SESSION\":", json_session, ",\"MVC_AUTH\":\"*\"}");
                    #endregion
                    return MZ_CORE.Msg.ResponseJson(json_session_mvc);
                }
            }
        }
    }
}
