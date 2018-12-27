using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MZ_DAL
{
    public class Base
    {
        /// <summary>
        /// 获取连接字符串
        /// </summary>
        private static readonly string centerConnString = ConfigurationManager.ConnectionStrings["CloudCenterConnStr"].ToString();

        /// <summary>
        /// 获取连接字符串
        /// </summary>
        private static readonly string connString = ConfigurationManager.ConnectionStrings["strConn"].ToString();

        /// <summary>
        /// 创建连接对象
        /// </summary>
        /// <returns></returns>
        public IDbConnection CreateConnection()
        {
            return new SqlConnection(connString);
        }

        public IDbConnection CreateCenterConnection()
        {
            return new SqlConnection(centerConnString);
        }

        /// <summary>
        /// UserCode
        /// </summary>		
        public string UserCode
        {
            get
            {
                if (HttpContext.Current.Request.Headers.GetValues("usercode") == null) return "";
                if (HttpContext.Current.Request.Headers.GetValues("usercode").Length > 0)
                    return HttpContext.Current.Request.Headers.GetValues("usercode")[0];
                return "";
            }
        }

        /// <summary>
        /// 对象过滤掉null值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        public void ObjectFilterNull<T>(ref T obj)
        {
            if (obj != null)
            {
                System.Reflection.PropertyInfo[] list = obj.GetType().GetProperties();
                for (int i = 0; i < list.Length; i++)
                {
                    if (list[i].PropertyType.FullName == "System.String")
                    {
                        if (list[i].GetValue(obj) == null)
                        {
                            list[i].SetValue(obj, "");
                        }
                        else
                        {
                            list[i].SetValue(obj, list[i].GetValue(obj).ToString().Trim());
                        }
                    }
                }
            }
        }

        /// <summary>
        /// 对象过滤掉null值,并执行解码
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        public void ObjectFilterNullDecode<T>(ref T obj)
        {
            if (obj != null)
            {
                System.Reflection.PropertyInfo[] list = obj.GetType().GetProperties();
                for (int i = 0; i < list.Length; i++)
                {
                    if (list[i].PropertyType.FullName == "System.String")
                    {
                        if (list[i].GetValue(obj) == null)
                        {
                            list[i].SetValue(obj, "");
                        }
                        else
                        {
                            list[i].SetValue(obj, HttpUtility.UrlDecode(list[i].GetValue(obj).ToString().Trim()));
                        }
                    }
                }
            }
        }

        /// <summary>
        /// 验证动态类型元素是否为空
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public bool CheckDynamic(object obj)
        {
            return (obj != null && Convert.ToString(obj) != "") ? true : false;
        }

        /// <summary>
        /// 动态类型元素转字符串并解码
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public string DynamicToString(object obj)
        {
            return CheckDynamic(obj) ? HttpUtility.UrlDecode(Convert.ToString(obj).Trim()) : "";
        }

        public string DynamicToStringNotDecode(object obj)
        {
            return CheckDynamic(obj) ? Convert.ToString(obj).Trim() : "";
        }
    }
}
