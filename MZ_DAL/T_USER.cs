using MZ_CORE;
using Dapper;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;

namespace MZ_DAL
{
    public class T_USERService : Base   
    {
        /// <summary>
        /// 验证账号是否可用
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public string CheckUserName(dynamic obj)
        {
            try
            {
                if (CheckDynamic(obj) && CheckDynamic(obj.username))
                {
                    using (IDbConnection conn = CreateConnection())
                    {
                        int num = conn.Query<int>("select count(*) from T_USER where username=@username", new { username = DynamicToString(obj.username) }).Single<int>();
                        return Msg.ToJson((num > 0) ? "{\"valid\":false}" : "{\"valid\":true}");
                    }
                }
                else
                {
                    return MZ_CORE.Msg.ToJson("{\"valid\":false}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public T_USER GetUser(string uSERNAME)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 注册
        /// </summary>
        /// <param name="me"></param>
        /// <returns></returns>
        public string Add(T_USER user)
        {
            try
            {
                ObjectFilterNull(ref user);
                using (IDbConnection conn = CreateConnection())
                {
                    conn.Open();
                    using (IDbTransaction transaction = conn.BeginTransaction())
                    {
                        try
                        {
                            #region 基本信息
                            //添加表信息
                            StringBuilder sb = new StringBuilder();
                            sb.Append("INSERT INTO T_USER");
                            sb.Append(" (GUID,USERNAME,PASSWORD,DISPLAYNAME,SEX,PHONE,EMAIL,AGE,REGISTERDATE,OWNERDESC)");
                            sb.Append(" VALUES (NEWID(),@USERNAME,@PASSWORD,@DISPLAYNAME,@SEX,@PHONE,@EMAIL,@AGE,@REGISTERDATE,@OWNERDESC)");
                            conn.Execute(sb.ToString(), new
                            {
                                USERNAME = user.USERNAME,
                                PASSWORD = Comm.Md5(user.PASSWORD),
                                DISPLAYNAME = user.DISPLAYNAME,
                                SEX = user.SEX,
                                PHONE = user.PHONE,
                                EMAIL = user.EMAIL,
                                AGE = user.AGE,
                                REGISTERDATE = user.REGISTERDATE,
                                OWNERDESC = user.OWNERDESC
                            }, transaction, null, CommandType.Text);
                            #endregion
                            transaction.Commit();
                            return Msg.ToJson(Msg.ResultLog(Msg.RST.SUC, Msg.ICO.ICO_1, "注册成功", user.USERNAME));
                        }
                        catch
                        {
                            transaction.Rollback();
                            return Msg.ToJson(Msg.Result(Msg.RST.ERR, Msg.ICO.ICO_2, "注册失败"));
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }

    public class T_USER
    {
        /// <summary>
        /// ID
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 标识
        /// </summary>
        public string GUID { get; set; }

        /// <summary>
        /// 用户账号
        /// </summary>
        public string USERNAME { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        public string DISPLAYNAME { get; set; }

        /// <summary>
        /// 用户密码
        /// </summary>
        public string PASSWORD { get; set; }

        /// <summary>
        /// 电话
        /// </summary>
        public string PHONE { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        public string EMAIL { get; set; }
        /// <summary>
        /// 年龄
        /// </summary>
        public string AGE { get; set; }

        /// <summary>
        /// 用户性别
        /// </summary>
        public int SEX { get; set; }

        /// <summary>
        /// 注册日期
        /// </summary>
        public string REGISTERDATE { get; set; }

        /// <summary>
        /// 个人说明
        /// </summary>
        public string OWNERDESC { get; set; }
    }
}
