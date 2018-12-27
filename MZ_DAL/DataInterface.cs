using MZ_CORE;
using Dapper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;

namespace MZ_DAL
{
    public class DataInterfaceService : Base
    {
        /// <summary>
        /// 执行SQL语句
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public string Excute(dynamic obj)
        {
            if (CheckDynamic(obj) && CheckDynamic(obj.SQL))
            {
                try
                {
                    using (IDbConnection conn = CreateConnection())
                    {
                        string sql = DynamicToString(obj.SQL);
                        int num = conn.Execute(sql);
                        if (num > 0)
                        {
                            return Msg.ToJson(Msg.Result(Msg.RST.SUC, "操作成功"));
                        }
                        else
                        {
                            return Msg.ToJson(Msg.Result(Msg.RST.ERR, "操作失败"));
                        }
                    }
                }
                catch (Exception ex)
                {
                    return Msg.ToJson(Msg.Result(Msg.RST.ERR, ex.Message));
                }
            }
            else
            {
                return Msg.ToJson(Msg.Result(Msg.RST.ERR, "参数错误"));
            }
        }

        /// <summary>
        /// SQL语句返回数据
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public string Query(dynamic obj)
        {
            if (CheckDynamic(obj) && CheckDynamic(obj.SQL))
            {
                try
                {
                    using (IDbConnection conn = CreateConnection())
                    {
                        string sql = DynamicToString(obj.SQL);
                        return Msg.ToJson(Msg.Result(Msg.RST.SUC, Msg.ICO.ICO_1, "成功", conn.Query(sql), ""));
                    }
                }
                catch (Exception ex)
                {
                    return Msg.ToJson(Msg.Result(Msg.RST.ERR, Msg.ICO.ICO_2, "失败", ex.Message, ""));
                }
            }
            else
            {
                return Msg.ToJson(Msg.Result(Msg.RST.ERR, "参数错误"));
            }
        }

        /// <summary>
        /// 从数据表获取数据
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public string GetDataByTable(dynamic obj)
        {
            if (CheckDynamic(obj) && CheckDynamic(obj.TabName))
            {
                try
                {
                    StringBuilder sb = new StringBuilder();
                    sb.Append(string.Concat("SELECT * FROM ", obj.TabName, (CheckDynamic(obj.Filter) ? string.Concat(" WHERE ", DynamicToString(obj.Filter)) : ""), (CheckDynamic(obj.Order) ? string.Concat(" ORDER BY ", DynamicToString(obj.Order)) : "")));
                    using (IDbConnection conn = CreateConnection())
                    {
                        return Msg.ToJson(Msg.Result(Msg.RST.SUC, Msg.ICO.ICO_1, "成功", conn.Query(sb.ToString()), ""));
                    }
                }
                catch (Exception ex)
                {
                    return Msg.ToJson(Msg.Result(Msg.RST.ERR, ex.Message));
                }
            }
            else
            {
                return Msg.ToJson(Msg.Result(Msg.RST.ERR, "参数错误", ""));
            }
        }


        /// <summary>
        /// 从数据表获取数据(分页)
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public string GetDataByTablePage(dynamic obj)
        {
            if (CheckDynamic(obj) && CheckDynamic(obj.TabName) && CheckDynamic(obj.Key) && CheckDynamic(obj.PageIndex) && CheckDynamic(obj.PageSize))
            {
                using (IDbConnection conn = CreateConnection())
                {
                    string Table = DynamicToString(obj.TabName);
                    string Key = DynamicToString(obj.Key);
                    int PageIndex = Convert.ToInt32(obj.PageIndex);
                    int PageSize = Convert.ToInt32(obj.PageSize);
                    string Fields = "*";
                    string Where = "";
                    string Order = "";
                    if (CheckDynamic(obj.Fields))
                    {
                        Fields = DynamicToString(obj.Fields);
                    }
                    if (CheckDynamic(obj.Where))
                    {
                        Where = DynamicToString(obj.Where);
                    }
                    if (CheckDynamic(obj.Order))
                    {
                        Order = DynamicToString(obj.Order);
                    }
                    string strSql1 = string.Concat("SELECT COUNT(", Key, ") FROM ", Table, (string.IsNullOrEmpty(Where) ? "" : string.Concat(" WHERE ", Where)));
                    string strSql2 = string.Concat("SELECT * FROM (SELECT ", Fields.ToUpper(), ", ROW_NUMBER() OVER(ORDER BY ", (string.IsNullOrEmpty(Order) ? Key : Order), ") AS ROWID FROM ", Table, (string.IsNullOrEmpty(Where) ? "" : string.Concat(" WHERE ", Where)), ") AS TEMPTABLE WHERE ROWID >= ", ((PageIndex - 1) * PageSize + 1), " AND ROWID<= ", (PageIndex * PageSize));
                    int totalcount = conn.Query<int>(strSql1).Single<int>();
                    return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", totalcount, ",\"rows\":", MZ_CORE.Msg.ToJson(conn.Query(strSql2)), "}");
                }
            }
            else
            {
                return Msg.ToJson(Msg.Result(Msg.RST.ERR, "参数错误", ""));
            }
        }

        /// <summary>
        /// 从存储过程获取数据
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public string GetDataByProcedure(dynamic obj)
        {
            if (CheckDynamic(obj) && CheckDynamic(obj.ProName.Value) && CheckDynamic(obj.ParamCount.Value))
            {
                using (IDbConnection conn = CreateConnection())
                {
                    string Name = DynamicToString(obj.ProName);
                    DynamicParameters param = new DynamicParameters();
                    int Count = Convert.ToInt32(obj["ParamCount"]);
                    for (int i = 0; i < Count; i++)
                    {
                        SetParam(ref param, Convert.ToString(obj[string.Concat("Param[", i, "][type]")]), Convert.ToString(obj[string.Concat("Param[", i, "][key]")]), Convert.ToString(obj[string.Concat("Param[", i, "][value]")]));
                    }
                    return Msg.ToJson(Msg.Result(Msg.RST.SUC, Msg.ICO.ICO_1, "成功", conn.Query(Name, param, null, true, null, CommandType.StoredProcedure), ""));
                }
            }
            else
            {
                return Msg.ToJson(Msg.Result(Msg.RST.ERR, "参数错误", ""));
            }
        }

        /// <summary>
        /// 从存储过程获取数据(分页)
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public string GetDataByProcedurePage(dynamic obj)
        {
            if (CheckDynamic(obj) && CheckDynamic(obj.ProName.Value) && CheckDynamic(obj.ParamCount.Value))
            {
                using (IDbConnection conn = CreateConnection())
                {
                    string Name = DynamicToString(obj.ProName);
                    DynamicParameters param = new DynamicParameters();
                    int Count = Convert.ToInt32(obj["ParamCount"]);
                    for (int i = 0; i < Count; i++)
                    {
                        SetParam(ref param, Convert.ToString(obj[string.Concat("Param[", i, "][type]")]), Convert.ToString(obj[string.Concat("Param[", i, "][key]")]), Convert.ToString(obj[string.Concat("Param[", i, "][value]")]));
                    }
                    param.Add("@TotalCount", 0, DbType.Int32, ParameterDirection.Output);
                    var data = conn.Query(Name, param, null, true, null, CommandType.StoredProcedure);
                    int TotalCount = param.Get<Int32>("@TotalCount");
                    return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", TotalCount, ",\"rows\":", MZ_CORE.Msg.ToJson(data), "}");
                }
            }
            else
            {
                return Msg.ToJson(Msg.Result(Msg.RST.ERR, "参数错误", ""));
            }
        }

        public string GetDataByProcedurePage_Template(dynamic obj)
        {
            if (CheckDynamic(obj) && CheckDynamic(obj.ProName.Value) && CheckDynamic(obj.ParamCount.Value))
            {
                using (IDbConnection conn = CreateConnection())
                {
                    try
                    {
                        string Name = DynamicToString(obj.ProName);
                        DynamicParameters param = new DynamicParameters();
                        int pageIndex = Convert.ToInt32(obj["PageIndex"]);
                        int pageSize = Convert.ToInt32(obj["PageSize"]);
                        int Count = Convert.ToInt32(obj["ParamCount"]);
                        for (int i = 0; i < Count; i++)
                        {
                            SetParam(ref param, Convert.ToString(obj[string.Concat("Param[", i, "][type]")]), Convert.ToString(obj[string.Concat("Param[", i, "][key]")]), Convert.ToString(obj[string.Concat("Param[", i, "][value]")]));
                        }
                        param.Add("@TotalCount", 0, DbType.Int32, ParameterDirection.Output);
                        var data = conn.Query(Name, param, null, true, null, CommandType.StoredProcedure);
                        int TotalCount = param.Get<Int32>("@TotalCount");
                        return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"totalcount\":", TotalCount, ",\"pagecount\":\"", ((TotalCount % pageSize == 0) ? (TotalCount / pageSize) : (TotalCount / pageSize + 1)), "\",\"pageindex\":\"", pageIndex, "\",\"rows\":", MZ_CORE.Msg.ToJson(data), "}");
                    }
                    catch (Exception)
                    {
                        return Msg.ToJson(Msg.Result(Msg.RST.ERR, "执行异常", ""));
                        throw;
                    }
                }
            }
            else
            {
                return Msg.ToJson(Msg.Result(Msg.RST.ERR, "参数错误", ""));
            }
        }

        public string BatUpdate(dynamic obj)
        {
            if (CheckDynamic(obj) && CheckDynamic(obj.SQL.Value) && CheckDynamic(obj.DATA.Value))
            {
                using (IDbConnection conn = CreateConnection())
                {
                    conn.Open();
                    using (IDbTransaction transaction = conn.BeginTransaction())
                    {
                        try
                        {
                            string SQL = DynamicToString(obj.SQL.Value);
                            string DATA = DynamicToString(obj.DATA.Value);
                            string[] list1 = DATA.Split('#');
                            if (list1 != null && list1.Length > 0)
                            {
                                for (int i = 0; i < list1.Length; i++)
                                {
                                    string m_sql = SQL;
                                    string[] list2 = list1[i].Split(',');
                                    if (list2 != null && list2.Length > 0)
                                    {
                                        for (int j = 0; j < list2.Length; j++)
                                        {
                                            m_sql = m_sql.Replace(string.Concat("{", j, "}"), list2[j]);
                                        }
                                        conn.Execute(m_sql, null, transaction, null, CommandType.Text);
                                    }
                                }
                            }
                            transaction.Commit();
                            return Msg.ToJson(Msg.Result(Msg.RST.SUC, Msg.ICO.ICO_1, "修改成功"));
                        }
                        catch (Exception ex)
                        {
                            transaction.Rollback();
                            throw new Exception(ex.Message);
                        }
                    }
                }
            }
            else
            {
                return Msg.ToJson(Msg.Result(Msg.RST.ERR, "参数错误", ""));
            }
        }

        private void SetParam(ref DynamicParameters param, string type, string key, string value)
        {
            key = HttpUtility.UrlDecode(key);
            value = HttpUtility.UrlDecode(value);
            switch (type)
            {
                case "String":
                    param.Add(string.Concat("@", key), value, DbType.String);
                    break;
                case "Int32":
                    param.Add(string.Concat("@", key), Int32.Parse(value), DbType.Int32);
                    break;
                case "Int64":
                    param.Add(string.Concat("@", key), Int64.Parse(value), DbType.Int64);
                    break;
                case "Double":
                    param.Add(string.Concat("@", key), Double.Parse(value), DbType.Double);
                    break;
                case "Decimal":
                    param.Add(string.Concat("@", key), Decimal.Parse(value), DbType.Decimal);
                    break;
                case "DateTime":
                    param.Add(string.Concat("@", key), DateTime.Parse(value), DbType.DateTime);
                    break;
                case "Boolean":
                    param.Add(string.Concat("@", key), Boolean.Parse(value), DbType.Boolean);
                    break;
            }
        }

        private DynamicParameters SetParam(DataRow dr)
        {
            DynamicParameters obj = new DynamicParameters();
            foreach (DataColumn col in dr.Table.Columns)
            {
                obj.Add(col.ColumnName, dr[col.ColumnName]);
            }
            return obj;
        }

        public string InsertForm(InsertModel model)
        {
            using (IDbConnection conn = CreateConnection())
            {
                conn.Open();
                using (IDbTransaction transaction = conn.BeginTransaction())
                {
                    try
                    {
                        string SQL = string.Concat("INSERT INTO ", model.MAINNAME, "({0}CREATEUSER,CRAATEDATE) VALUES({1}'", model.CREATEUSER, "',GETDATE());SELECT CAST(SCOPE_IDENTITY() AS INT);");
                        DataTable dt1 = MZ_CORE.Msg.JsonToDataTable(model.MAINNAME, JObject.Parse(string.Concat("{", model.MAINNAME, ":", model.MAINJSON, "}")));
                        DataTable dt2 = MZ_CORE.Msg.JsonToDataTable(model.SUBNAME, JObject.Parse(string.Concat("{", model.SUBNAME, ":", model.SUBJSON, "}")));
                        if (dt1 != null && dt1.Rows.Count > 0)
                        {
                            string key1 = "";
                            foreach (DataColumn col in dt1.Columns)
                            {
                                key1 += col.ColumnName + ",";
                            }
                            int identity = conn.QueryFirst<int>(string.Format(SQL, key1, string.Concat("@", key1.Replace(",", ",@").TrimEnd('@'))), SetParam(dt1.Rows[0]), transaction, null, CommandType.Text);
                            if (identity > 0)
                            {
                                if (dt2 != null && dt2.Rows.Count > 0)
                                {
                                    string key2 = "";
                                    foreach (DataColumn col in dt2.Columns)
                                    {
                                        key2 += col.ColumnName + ",";
                                    }
                                    SQL = string.Concat("INSERT INTO ", model.SUBNAME, "({0}", model.SUBID, ",CREATEUSER,CRAATEDATE) VALUES({1}", identity, ",'", model.CREATEUSER, "',GETDATE());");
                                    for (int i = 0; i < dt2.Rows.Count; i++)
                                    {
                                        conn.Execute(string.Format(SQL, key2, string.Concat("@", key2.Replace(",", ",@").TrimEnd('@'))), SetParam(dt2.Rows[i]), transaction, null, CommandType.Text);
                                    }
                                }
                                transaction.Commit();
                            }
                            else
                            {
                                return Msg.ToJson(Msg.Result(Msg.RST.ERR, Msg.ICO.ICO_2, "操作失败"));
                            }
                        }
                        return Msg.ToJson(Msg.Result(Msg.RST.SUC, Msg.ICO.ICO_1, "操作成功"));
                    }
                    catch
                    {
                        transaction.Rollback();
                        return Msg.ToJson(Msg.Result(Msg.RST.ERR, Msg.ICO.ICO_2, "操作失败"));
                    }
                }
            }
        }
    }

    public class InsertModel
    {
        public string FORMNO { get; set; }
        //主表名称
        public string MAINNAME { get; set; }
        //主表JSON
        public string MAINJSON { get; set; }
        //从表关联主表ID的字段名
        public string SUBID { get; set; }
        //从表名称
        public string SUBNAME { get; set; }
        //从表JSON
        public string SUBJSON { get; set; }
        //创建用户
        public string CREATEUSER { get; set; }
    }
}
