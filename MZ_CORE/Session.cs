using System;
using System.Web;
using System.Web.SessionState;
using System.Net;

namespace MZ_CORE
{
    public class Session
    {
        //用户唯一标识
        public string UserCode { get; set; }
        //用户密码
        public string UserPwd { get; set; }
        //SessionKey
        public string SessionKey { get; set; }
        //用户名称
        public string DisplayName { get; set; }
        //用户头像
        public string PhotoGraphFileName { get; set; }
        //用户工号
        public string HRID { get; set; }
        //租户ID
        public string TenantID { get; set; }
        //部门GUID
        public string DeptGuid { get; set; }
        //部门名称
        public string DeptName { get; set; }
        //职务
        public string Job { get; set; }
        //职务名称
        public string JobName { get; set; }
        //直属主管
        public string SuperManage { get; set; }
        //门户默认主页
        public string US022 { get; set; }

        public string Para0 { get; set; }
    }
}
