using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Web;

namespace MZ_CORE
{
    public static class ApiHelper
    {
        //得到签名
        public static string GetSignture(string timeStamp, string random, string usercode, string signtoken, string data)
        {
            var hash = System.Security.Cryptography.MD5.Create();
            //拼接签名数据
            var signStr = string.Concat(timeStamp, random, usercode.ToUpper(), signtoken, data);
            //将字符串中字符按升序排序
            var sortStr = string.Concat(signStr.OrderBy(c => c));
            var bytes = Encoding.UTF8.GetBytes(sortStr);
            //使用MD5加密
            var md5Val = hash.ComputeHash(bytes);
            //把二进制转化为大写的十六进制
            StringBuilder result = new StringBuilder();
            foreach (var c in md5Val)
            {
                result.Append(c.ToString("X2"));
            }
            return result.ToString().ToUpper();
        }
    }

    public class token
    {
        // 用户名
        public string UserCode { get; set; }
        // 用户名对应签名Token
        public Guid SignToken { get; set; }
        // Token过期时间
        public long ExpireTime { get; set; }
    }
}
