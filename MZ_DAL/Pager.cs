using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web;

namespace MZ_DAL
{
    public class Pager : Base
    {
        public int pageindex { get; set; }
        public int pageSize { get; set; }
        public string key1 { get; set; }
        public string key2 { get; set; }
        public string key3 { get; set; }
        public string key4 { get; set; }
        public string key5 { get; set; }
        public string key6 { get; set; }
        public string key7 { get; set; }
        public string key8 { get; set; }
        public string key9 { get; set; }
        public string key10 { get; set; }
        public string sortName { get; set; }
        public string sortOrder { get; set; }
        public string autouser { get; set; }
        public string loginuser { get; set; }
        public string sqlWhere { get; set; }
        public string reportauth { get; set; }
        public string TabName { get; set; }

        public string Filter { get; set; }

        public string Order { get; set; }

        public string Account { get; set; }


        public string proID { get; set; }

        public string ID { get; set; }

        public string Type { get; set; }

        public string proType { get; set; }

        public string Guid { get; set; }




        /// <summary>
        /// 获取分页数据json
        /// </summary>
        /// <param name="pageIndex">当前页</param>
        /// <param name="pageSize"> 每页大小</param>
        /// <param name="strTable"> 表　(table1 a left join table2 b on a.id=b.id)</param>
        /// <param name="strkey">   主键(a.id)</param>
        /// <param name="strFields">字段(a.id,a.key1,a.key2,b.key1,b.key2)</param>
        /// <param name="strWhere"> 条件(a.key1='a' and b.key1='b')</param>
        /// <param name="strOrder"> 排序(a.id asc,b.id desc)</param>
        /// <returns>JSON格式字符串</returns>
        public string GetPageToJson(int pageIndex, int pageSize, string strTable, string strkey, string strFields, string strWhere, string strOrder)
        {
            using (IDbConnection conn = CreateConnection())
            {
                string strSql1 = string.Concat("SELECT COUNT(", strkey, ") FROM ", strTable, (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)));
                string strSql2 = string.Concat("SELECT * FROM (SELECT ", strFields.ToUpper(), ", ROW_NUMBER() OVER(ORDER BY ", (string.IsNullOrEmpty(strOrder) ? strkey : strOrder), ") AS ROWID FROM ", strTable, (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), ") AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), " ORDER BY ROWID ASC");
                int totalcount = conn.QuerySingle<int>(strSql1);
                return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"totalcount\":", totalcount, ",\"pagecount\":\"", ((totalcount % pageSize == 0) ? (totalcount / pageSize) : (totalcount / pageSize + 1)), "\",\"pageindex\":\"", pageIndex, "\",\"rows\":", MZ_CORE.Msg.ToJson(conn.Query(strSql2)), "}");
            }
        }

        /// <summary>
        /// 获取分页数据json
        /// </summary>
        /// <param name="pageIndex">当前页</param>
        /// <param name="pageSize"> 每页大小</param>
        /// <param name="strTable"> 表　(table1 a left join table2 b on a.id=b.id)</param>
        /// <param name="strkey">   主键(a.id)</param>
        /// <param name="strFields">字段(a.id,a.key1,a.key2,b.key1,b.key2)</param>
        /// <param name="strWhere"> 条件(a.key1='a' and b.key1='b')</param>
        /// <param name="strOrder"> 排序(a.id asc,b.id desc)</param>
        /// <returns>JSON格式字符串</returns>
        public string GetPageToJsonForBootStarpTB(int pageIndex, int pageSize, string strTable, string strkey, string strFields, string strWhere, string strOrder)
        {
            using (IDbConnection conn = CreateConnection())
            {
                string strSql1 = string.Concat("SELECT COUNT(", strkey, ") FROM ", strTable, (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)));
                string strSql2 = string.Concat("SELECT * FROM (SELECT ", strFields.ToUpper(), ", ROW_NUMBER() OVER(ORDER BY ", (string.IsNullOrEmpty(strOrder) ? strkey : strOrder), ") AS ROWID FROM ", strTable, (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), ") AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), " ORDER BY ROWID ASC");
                //string strSql3 = string.Concat("SELECT DISTINCT DEPTNAME,DEPTGUID FROM ", strTable, (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)));
                int totalcount = conn.Query<int>(strSql1).Single<int>();
                return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", totalcount, ",\"rows\":", MZ_CORE.Msg.ToJson(conn.Query(strSql2)), "}");//, ",\"depts\":", MZ_CORE.Msg.ToJson(conn.Query(strSql3)),
            }
        }


        /// <summary>
        /// 获取分页数据json
        /// </summary>
        /// <param name="pageIndex">当前页</param>
        /// <param name="pageSize"> 每页大小</param>
        /// <param name="strTable"> 表　(table1 a left join table2 b on a.id=b.id)</param>
        /// <param name="strkey">   主键(a.id)</param>
        /// <param name="strFields">字段(a.id,a.key1,a.key2,b.key1,b.key2)</param>
        /// <param name="strWhere"> 条件(a.key1='a' and b.key1='b')</param>
        /// <param name="strOrder"> 排序(a.id asc,b.id desc)</param>
        /// <returns>JSON格式字符串</returns>
        public string GetPageToJsonForBootStarpTBMobile(int pageIndex, int pageSize, string strTable, string strkey, string strFields, string strWhere, string strOrder)
        {
            using (IDbConnection conn = CreateConnection())
            {
                string strSql1 = string.Concat("SELECT COUNT(", strkey, ") FROM ", strTable, (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)));
                string strSql2 = string.Concat("SELECT * FROM (SELECT ", strFields.ToUpper(), ", ROW_NUMBER() OVER(ORDER BY ", (string.IsNullOrEmpty(strOrder) ? strkey : strOrder), ") AS ROWID FROM ", strTable, (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), ") AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), " ORDER BY ROWID ASC");
                //string strSql3 = string.Concat("SELECT DISTINCT DEPTNAME,DEPTGUID FROM ", strTable, (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)));
                int totalcount = conn.Query<int>(strSql1).Single<int>();
                return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", totalcount, ",\"rows\":", MZ_CORE.Msg.ToJson(conn.Query(strSql2)), "}");
                //return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", totalcount, ",\"rows\":", MZ_CORE.Msg.ToJson(conn.Query(strSql2)), ",\"depts\":", MZ_CORE.Msg.ToJson(conn.Query(strSql3)), "}");
            }
        }



        /// <summary>
        /// 获取分页数据带排序json
        /// </summary>
        /// <param name="pageIndex">当前页</param>
        /// <param name="pageSize"> 每页大小</param>
        /// <param name="strTable"> 表　(table1 a left join table2 b on a.id=b.id)</param>
        /// <param name="strkey">   主键(a.id)</param>
        /// <param name="strFields">字段(a.id,a.key1,a.key2,b.key1,b.key2)</param>
        /// <param name="strWhere"> 条件(a.key1='a' and b.key1='b')</param>
        /// <param name="strOrder"> 排序(a.id asc,b.id desc)</param>
        /// <returns>JSON格式字符串</returns>
        public string GetPageToJsonForBootStarpTBForSort(int pageIndex, int pageSize, string strTable, string strkey, string strFields, string strWhere, string sortName, string sortOrder)
        {
            using (IDbConnection conn = CreateConnection())
            {
                string strSql1 = string.Concat("SELECT COUNT(", strkey, ") FROM ", strTable, (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)));
                string strSql2 = string.Concat("SELECT * FROM (SELECT ", strFields.ToUpper(), ", ROW_NUMBER() OVER(ORDER BY ", (string.IsNullOrEmpty(sortName) ? strkey : sortName), " " + sortOrder + ") AS ROWID FROM ", strTable, (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), ") AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), " ORDER BY ROWID ASC");
                int totalcount = conn.Query<int>(strSql1).Single<int>();
                return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", totalcount, ",\"rows\":", MZ_CORE.Msg.ToJson(conn.Query(strSql2)), "}");
            }
        }


        /// <summary>
        /// 获取分页数据json
        /// </summary>
        /// <param name="pageIndex">当前页</param>
        /// <param name="pageSize"> 每页大小</param>
        /// <param name="SQL">执行的SQL语句</param>
        /// <param name="strWhere">查询条件</param>
        /// <param name="strkey">主键</param>
        /// <param name="sortName">排序字段</param>
        /// <param name="sortOrder">排序方式</param>
        /// <returns>JSON格式字符串</returns>
        public string GetPageToJsonForBootStarBySQL(int pageIndex, int pageSize, string SQL, string strWhere, string strkey, string sortName, string sortOrder)
        {
            int totalcount = 0;
            dynamic list = null;
            using (IDbConnection conn = CreateConnection())
            {
                string sqlStr = string.Concat(@"
                    DECLARE @SQL VARCHAR(MAX)
                    SET @SQL='", SQL, @"'
                    EXEC('SELECT COUNT(*) from (SELECT * FROM ('+@SQL+') A ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), @" ) TEMP;
	                SELECT * FROM (SELECT ROW_NUMBER() OVER(ORDER BY ", (string.IsNullOrEmpty(sortName) ? strkey : sortName), " " + sortOrder + ") AS ROWID,* FROM (SELECT * FROM ('+@SQL+') A ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), @" ) TEMP) 
	                AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), "')");
                conn.Open();
                using (var multi = conn.QueryMultiple(sqlStr))
                {
                    //multi.IsConsumed   reader的状态 ，true 是已经释放
                    if (!multi.IsConsumed)
                    {
                        totalcount = multi.Read<int>().FirstOrDefault();
                        list = multi.Read<dynamic>();
                    }

                }
                return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", totalcount, ",\"rows\":", MZ_CORE.Msg.ToJson(list), "}");
            }
        }



        /// <summary>
        /// 获取分页数据json
        /// </summary>
        /// <param name="pageIndex">当前页</param>
        /// <param name="pageSize"> 每页大小</param>
        /// <param name="SQL">执行的SQL语句</param>
        /// <param name="strWhere">查询条件</param>
        /// <param name="strkey">主键</param>
        /// <param name="sortName">排序字段</param>
        /// <param name="sortOrder">排序方式</param>
        /// <returns>JSON格式字符串</returns>
        public string GetPageToJsonForBootStarBySQL(int pageIndex, int pageSize, string SQL, string strWhere, string strkey, string sortName, string sortOrder, string sumName)
        {
            int totalcount = 0;
            dynamic sum = 0;
            dynamic list = null;
            using (IDbConnection conn = CreateConnection())
            {
                string sqlStr = string.Concat(@"
                    DECLARE @SQL VARCHAR(MAX)
                    SET @SQL='", SQL, @"'
                    EXEC('
                    SELECT " + sumName + @" from (SELECT * FROM ('+@SQL+') A ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), @" ) TEMP;
                    SELECT COUNT(*) from (SELECT * FROM ('+@SQL+') A ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), @" ) TEMP;
	                SELECT * FROM (SELECT ROW_NUMBER() OVER(ORDER BY ", (string.IsNullOrEmpty(sortName) ? strkey : sortName), " " + sortOrder + ") AS ROWID,* FROM (SELECT * FROM ('+@SQL+') A ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), @" ) TEMP) 
	                AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), "')");

                conn.Open();
                using (var multi = conn.QueryMultiple(sqlStr))
                {
                    //multi.IsConsumed   reader的状态 ，true 是已经释放
                    if (!multi.IsConsumed)
                    {
                        sum = multi.Read<dynamic>();
                        totalcount = multi.Read<int>().FirstOrDefault();
                        list = multi.Read<dynamic>();
                    }

                }
                return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", totalcount, ",\"rows\":", MZ_CORE.Msg.ToJson(list), ",\"sum\":", MZ_CORE.Msg.ToJson(sum), "}");
            }
        }




        /// <summary>
        /// 获取分页数据json
        /// </summary>
        /// <param name="pageIndex">当前页</param>
        /// <param name="pageSize"> 每页大小</param>
        /// <param name="SID"> 数据源ID　(table1 a left join table2 b on a.id=b.id)</param>
        /// <param name="strkey">   主键(a.id)</param>
        /// <param name="strFields">字段(a.id,a.key1,a.key2,b.key1,b.key2)</param>
        /// <param name="strWhere"> 条件(a.key1='a' and b.key1='b')</param>
        /// <param name="strOrder"> 排序(a.id asc,b.id desc)</param>
        /// <returns>JSON格式字符串</returns>
        public string GetPageToJsonForBootStarpPublicWindow(int pageIndex, int pageSize, int SID, string strkey, string strWhere, string strOrder)
        {
            int totalcount = 0;
            dynamic list = null;
            using (IDbConnection conn = CreateConnection())
            {
                try
                {
                    //string sqlStr = string.Concat(@"
                    //DECLARE @SQL VARCHAR(MAX)
                    //SELECT @SQL=MC003 FROM dbo.SYSMC WHERE ID=", SID, @"
                    //EXEC('SELECT COUNT(*) from (select * from ('+@SQL+') a  where 1=1 ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat("", strWhere)), @") TEMP;
                    //SELECT * FROM (SELECT ROW_NUMBER() OVER(ORDER BY ", (string.IsNullOrEmpty(strOrder) ? strkey : strOrder), ") AS ROWID,* FROM (select * from ('+@SQL+') a  where 1=1 ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat("", strWhere)), @") TEMP) 
                    //AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), "')");

                    string sqlStr = string.Concat(@"
                     
                    DECLARE @OrderField VARCHAR(200)
                    DECLARE @Sort VARCHAR(MAX)

                    if(@OrderField='')
                    set @OrderField='(select 0)'

                    if(@Sort='')
                    set @Sort='desc'

                    DECLARE @SQL VARCHAR(MAX)
                    SELECT @SQL=MC003,@OrderField=isnull(udf09,''),@Sort=isnull(udf10,'') FROM dbo.SYSMC WHERE ID=", SID, @"
                    EXEC('SELECT COUNT(*) from (select * from ('+@SQL+' ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat("", strWhere)), @") a) TEMP;
	                SELECT * FROM (SELECT ROW_NUMBER() OVER(ORDER BY '+@OrderField+'  '+@Sort+') AS ROWID,* FROM (select * from ('+@SQL+' ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat("", strWhere)), @") a) TEMP) 
	                AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), "')");


                    conn.Open();
                    using (var multi = conn.QueryMultiple(sqlStr))
                    {
                        //multi.IsConsumed   reader的状态 ，true 是已经释放
                        if (!multi.IsConsumed)
                        {
                            totalcount = multi.Read<int>().FirstOrDefault();
                            list = multi.Read<dynamic>();
                        }
                    }
                    return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", totalcount, ",\"rows\":", MZ_CORE.Msg.ToJson(list), "}");
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }



        /// <summary>
        /// 获取分页数据json
        /// </summary>
        /// <param name="pageIndex">当前页</param>
        /// <param name="pageSize"> 每页大小</param>
        /// <param name="SID"> 数据源ID　(table1 a left join table2 b on a.id=b.id)</param>
        /// <param name="strkey">   主键(a.id)</param>
        /// <param name="strFields">字段(a.id,a.key1,a.key2,b.key1,b.key2)</param>
        /// <param name="strWhere"> 条件(a.key1='a' and b.key1='b')</param>
        /// <param name="strOrder"> 排序(a.id asc,b.id desc)</param>
        /// <returns>JSON格式字符串</returns>
        public string GetPageToJsonForBootStarpPublicWindowForMobile(int pageIndex, int pageSize, int SID, string strkey, string strWhere, string strOrder, bool isSuperManger, string UserCode, string FormNo, string Access, string Range)
        {
            int totalcount = 0;
            dynamic Columns = "";
            dynamic SqlWhere = "";
            dynamic list = null;

            string[] temp = Range.Split('|');
            bool AllUser = temp[0] == "1" ? true : false;//全部用户
            bool CurUser = temp[1] == "1" ? true : false;//当前用户
            bool AccUser = temp[2] == "1" ? true : false;//权限用户



            if (isSuperManger)//不是超级管理员
            {
                if (!AllUser)//如果没有选择所有用户
                {
                    if (CurUser && !AccUser)//如果只勾选了当前用户并且没有选择权限用户
                    {
                        strWhere += string.Format(@" And {1} in (''{0}'')", UserCode, Access);
                    }
                    //if (CurUser && AccUser)//如果同时勾选了当前用户和权限用户
                    //{
                    //        strWhere += string.Format(@" And {2} in (
                    //    SELECT ''{0}''
                    //    UNION ALL
                    //    SELECT DISTINCT MS003 FROM(      
                    //    SELECT R.MR002 MS002, E.ME002, LOWER(E.ME005) ME005, R.MR003 MS003 FROM SYSMR R
                    //    JOIN SYSMI I ON R.MR001 = I.MI002 AND I.MI001 = ''{0}''
                    //    JOIN SYSMF F ON I.MI002 = F.MF001 AND F.MF003 = 1
                    //    JOIN SYSME E ON R.MR002 = E.ME001 AND E.ME007 = 1
                    //    WHERE R.MR002= ''{1}''
                    //    UNION ALL
                    //    SELECT S.MS002, E.ME002, E.ME005, S.MS003 FROM SYSMS S
                    //    JOIN SYSME E ON S.MS001 =  ''{0}'' AND S.MS002 = E.ME001 AND E.ME007 = 1
                    //    WHERE s.ms002= ''{1}''
                    //    ) T)
                    //", UserCode, FormNo, Access);
                    //}
                    //if (!CurUser && AccUser)//如果只勾选了权限用户并且没有选择当前用户
                    //{
                    //    strWhere += string.Format(@" And {2} in (
                    //    SELECT DISTINCT MS003 FROM(      
                    //    SELECT R.MR002 MS002, E.ME002, LOWER(E.ME005) ME005, R.MR003 MS003 FROM SYSMR R
                    //    JOIN SYSMI I ON R.MR001 = I.MI002 AND I.MI001 = ''{0}''
                    //    JOIN SYSMF F ON I.MI002 = F.MF001 AND F.MF003 = 1
                    //    JOIN SYSME E ON R.MR002 = E.ME001 AND E.ME007 = 1
                    //    WHERE R.MR002= ''{1}''
                    //    UNION ALL
                    //    SELECT S.MS002, E.ME002, E.ME005, S.MS003 FROM SYSMS S
                    //    JOIN SYSME E ON S.MS001 =  ''{0}'' AND S.MS002 = E.ME001 AND E.ME007 = 1
                    //    WHERE s.ms002= ''{1}''
                    //    ) T)
                    //", UserCode, FormNo, Access);
                    //}

                    if (CurUser && AccUser)//如果同时勾选了当前用户和权限用户
                    {
                        strWhere += string.Format(@" And cast({2} as varchar(500)) in (
                        SELECT ''{0}''
                        UNION ALL
                       SELECT DISTINCT MS003 FROM(
                        
    
                        --角色数据权限人员
                        SELECT R.MR002 MS002, E.ME002, LOWER(E.ME005) ME005, R.MR003 MS003 FROM SYSMR R
                        JOIN SYSMI I ON R.MR001 = I.MI002 AND I.MI001 = ''{0}''
                        JOIN SYSMF F ON I.MI002 = F.MF001 AND F.MF003 = 1
                        JOIN SYSME E ON R.MR002 = E.ME001 AND E.ME007 = 1
                        WHERE R.MR004 = 0 AND R.MR002= ''{1}''
                        UNION ALL
                        --角色数据权限部门人员
                        SELECT R.MR002 MS002, E.ME002, LOWER(E.ME005) ME005, U.ACCOUNT MS003 FROM SYSMR R
                        JOIN SYSMI I ON R.MR001 = I.MI002 AND I.MI001 = ''{0}''
                        JOIN SYSMF F ON I.MI002 = F.MF001 AND F.MF003 = 1
                        JOIN SYSME E ON R.MR002 = E.ME001 AND E.ME007 = 1
                        LEFT JOIN SYSUSER U ON R.MR003 = U.DEPTGUID
                        WHERE R.MR004 = 1 AND R.MR002= ''{1}''
                        UNION ALL
                        --用户数据权限人员
                        SELECT S.MS002, E.ME002, LOWER(E.ME005) ME005, S.MS003 FROM SYSMS S
                        JOIN SYSME E ON S.MS001 = ''{0}'' AND S.MS002 = E.ME001 AND E.ME007 = 1
                        WHERE S.MS004 = 0 AND S.MS002= ''{1}''
                        UNION ALL
                        --用户数据权限部门人员
                        SELECT S.MS002, E.ME002, LOWER(E.ME005) ME005, U.ACCOUNT MS003 FROM SYSMS S
                        JOIN SYSME E ON S.MS001 = ''{0}'' AND S.MS002 = E.ME001 AND E.ME007 = 1
                        LEFT JOIN SYSUSER U ON S.MS003 = U.DEPTGUID
                        WHERE S.MS004 = 1 AND S.MS002= ''{1}''
                        ) T WHERE T.MS003 IS NOT NULL )
                        
                    ", UserCode, FormNo, Access);
                    }
                    if (!CurUser && AccUser)//如果只勾选了权限用户并且没有选择当前用户
                    {
                        strWhere += string.Format(@" And cast({2} as varchar(500)) in (
                       SELECT DISTINCT MS003 FROM(
                        
    
                        --角色数据权限人员
                        SELECT R.MR002 MS002, E.ME002, LOWER(E.ME005) ME005, R.MR003 MS003 FROM SYSMR R
                        JOIN SYSMI I ON R.MR001 = I.MI002 AND I.MI001 = ''{0}''
                        JOIN SYSMF F ON I.MI002 = F.MF001 AND F.MF003 = 1
                        JOIN SYSME E ON R.MR002 = E.ME001 AND E.ME007 = 1
                        WHERE R.MR004 = 0 AND R.MR002= ''{1}''
                        UNION ALL
                        --角色数据权限部门人员
                        SELECT R.MR002 MS002, E.ME002, LOWER(E.ME005) ME005, U.ACCOUNT MS003 FROM SYSMR R
                        JOIN SYSMI I ON R.MR001 = I.MI002 AND I.MI001 = ''{0}''
                        JOIN SYSMF F ON I.MI002 = F.MF001 AND F.MF003 = 1
                        JOIN SYSME E ON R.MR002 = E.ME001 AND E.ME007 = 1
                        LEFT JOIN SYSUSER U ON R.MR003 = U.DEPTGUID
                        WHERE R.MR004 = 1 AND R.MR002= ''{1}''
                        UNION ALL
                        --用户数据权限人员
                        SELECT S.MS002, E.ME002, LOWER(E.ME005) ME005, S.MS003 FROM SYSMS S
                        JOIN SYSME E ON S.MS001 = ''{0}'' AND S.MS002 = E.ME001 AND E.ME007 = 1
                        WHERE S.MS004 = 0 AND S.MS002= ''{1}''
                        UNION ALL
                        --用户数据权限部门人员
                        SELECT S.MS002, E.ME002, LOWER(E.ME005) ME005, U.ACCOUNT MS003 FROM SYSMS S
                        JOIN SYSME E ON S.MS001 = ''{0}'' AND S.MS002 = E.ME001 AND E.ME007 = 1
                        LEFT JOIN SYSUSER U ON S.MS003 = U.DEPTGUID
                        WHERE S.MS004 = 1 AND S.MS002= ''{1}''
                         ) T WHERE T.MS003 IS NOT NULL )
                        
                    ", UserCode, FormNo, Access);
                    }



                }
            }





            using (IDbConnection conn = CreateConnection())
            {
                try
                {
                    string sqlStr = string.Concat(@"
 
                   
                    DECLARE @OrderField VARCHAR(200)
                    DECLARE @Sort VARCHAR(MAX)

                    DECLARE @SQL VARCHAR(MAX)
                    DECLARE @COLUMNS VARCHAR(MAX)
                    DECLARE @SQLWHERE VARCHAR(MAX)
                    SELECT @SQL=MC003,@COLUMNS=MC002,@SQLWHERE=MC012,@OrderField=isnull(udf09,''),@Sort=isnull(udf10,'') FROM dbo.SYSMC WHERE ID=", SID, @"

                    if(@OrderField='')
                    set @OrderField='(select 0)'

                    if(@Sort='')
                    set @Sort='desc'

                    EXEC('SELECT COUNT(*) from (select * from (SELECT * FROM ('+@SQL+') A ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), @") TEMP)TEMP;
                    SELECT '''+@COLUMNS+''';
                    SELECT '''+@SQLWHERE+''';
	                SELECT * FROM (SELECT ROW_NUMBER() OVER(ORDER BY '+@OrderField+'  '+@Sort+') AS ROWID,* FROM (SELECT * FROM ('+@SQL+') A ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), @" ) TEMP) 
	                AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), "')");

                    conn.Open();
                    using (var multi = conn.QueryMultiple(sqlStr))
                    {
                        //multi.IsConsumed   reader的状态 ，true 是已经释放
                        if (!multi.IsConsumed)
                        {
                            totalcount = multi.Read<int>().FirstOrDefault();
                            Columns = multi.Read<string>().FirstOrDefault();
                            SqlWhere = multi.Read<string>().FirstOrDefault();
                            list = multi.Read<dynamic>();
                        }
                    }
                    return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", totalcount, ",\"rows\":", MZ_CORE.Msg.ToJson(list), ",\"Columns\":", Columns, ",\"SqlWhere\":", SqlWhere, "}");
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }




        /// <summary>
        /// 获取分页数据json
        /// </summary>
        /// <param name="pageIndex">当前页</param>
        /// <param name="pageSize"> 每页大小</param>
        /// <param name="SID"> 数据源ID　(table1 a left join table2 b on a.id=b.id)</param>
        /// <param name="strkey">   主键(a.id)</param>
        /// <param name="strFields">字段(a.id,a.key1,a.key2,b.key1,b.key2)</param>
        /// <param name="strWhere"> 条件(a.key1='a' and b.key1='b')</param>
        /// <param name="strOrder"> 排序(a.id asc,b.id desc)</param>
        /// <returns>JSON格式字符串</returns>
        public string GetPageToJsonForBootStarpSubForMobile(int pageIndex, int pageSize, int SID, string strkey, string strWhere, string strOrder, string UserCode)
        {
            int totalcount = 0;
            dynamic list = null;

            using (IDbConnection conn = CreateConnection())
            {
                try
                {
                    string sqlStr = string.Concat(@"
                    DECLARE @SQL VARCHAR(MAX)
                    SELECT @SQL=MC003 FROM dbo.SYSMC WHERE ID=", SID, @"
                    EXEC('SELECT COUNT(*) from (select * from (SELECT * FROM ('+@SQL+') A ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), @") TEMP)TEMP;
	                SELECT * FROM (SELECT ROW_NUMBER() OVER(ORDER BY ", (string.IsNullOrEmpty(strOrder) ? strkey : strOrder), ") AS ROWID,* FROM (SELECT * FROM ('+@SQL+') A ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), @" ) TEMP) 
	                AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), "')");

                    conn.Open();
                    using (var multi = conn.QueryMultiple(sqlStr))
                    {
                        //multi.IsConsumed   reader的状态 ，true 是已经释放
                        if (!multi.IsConsumed)
                        {
                            totalcount = multi.Read<int>().FirstOrDefault();
                            list = multi.Read<dynamic>();
                        }
                    }
                    return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", totalcount, ",\"rows\":", MZ_CORE.Msg.ToJson(list), "}");
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }




        /// <summary>
        /// 获取分页数据json
        /// </summary>
        /// <param name="pageIndex">当前页</param>
        /// <param name="pageSize"> 每页大小</param>
        /// <param name="SID"> 数据源ID　(table1 a left join table2 b on a.id=b.id)</param>
        /// <param name="strkey">   主键(a.id)</param>
        /// <param name="strFields">字段(a.id,a.key1,a.key2,b.key1,b.key2)</param>
        /// <param name="strWhere"> 条件(a.key1='a' and b.key1='b')</param>
        /// <param name="strOrder"> 排序(a.id asc,b.id desc)</param>
        /// <returns>JSON格式字符串</returns>
        public string GetPageToJsonForListPublicWindowForMobile(int pageIndex, int pageSize, int SID, string strkey, string strWhere, string strOrder, bool isSuperManger, string UserCode, string FormNo, string Access)
        {
            int totalcount = 0;
            dynamic list = null;

            if (isSuperManger)
            {
                strWhere += string.Format(@" And {2} in (
                    SELECT DISTINCT MS003 FROM(      
                    SELECT R.MR002 MS002, E.ME002, LOWER(E.ME005) ME005, R.MR003 MS003 FROM SYSMR R
                    JOIN SYSMI I ON R.MR001 = I.MI002 AND I.MI001 = ''{0}''
                    JOIN SYSMF F ON I.MI002 = F.MF001 AND F.MF003 = 1
                    JOIN SYSME E ON R.MR002 = E.ME001 AND E.ME007 = 1
                    WHERE R.MR002= ''{1}''
                    UNION ALL
                    SELECT S.MS002, E.ME002, E.ME005, S.MS003 FROM SYSMS S
                    JOIN SYSME E ON S.MS001 =  ''{0}'' AND S.MS002 = E.ME001 AND E.ME007 = 1
                    WHERE s.ms002= ''{1}''
                    ) T)
                ", UserCode, FormNo, Access);

            }

            using (IDbConnection conn = CreateConnection())
            {
                try
                {
                    string sqlStr = string.Concat(@"
                    DECLARE @SQL VARCHAR(MAX)
                    SELECT @SQL=MK009 FROM dbo.SYSMKMobiles WHERE ID=", SID, @"
                    EXEC('SELECT COUNT(*) from (select * from (SELECT * FROM ('+@SQL+') A ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), @") TEMP)TEMP;
	                SELECT * FROM (SELECT ROW_NUMBER() OVER(ORDER BY ", (string.IsNullOrEmpty(strOrder) ? strkey : strOrder), ") AS ROWID,* FROM (SELECT * FROM ('+@SQL+') A ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), @" ) TEMP) 
	                AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), "')");

                    conn.Open();
                    using (var multi = conn.QueryMultiple(sqlStr))
                    {
                        //multi.IsConsumed   reader的状态 ，true 是已经释放
                        if (!multi.IsConsumed)
                        {
                            totalcount = multi.Read<int>().FirstOrDefault();
                            list = multi.Read<dynamic>();
                        }
                    }
                    return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", totalcount, ",\"rows\":", MZ_CORE.Msg.ToJson(list), "}");
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }



        /// <summary>
        /// 获取分页数据json
        /// </summary>
        /// <param name="pageIndex">当前页</param>
        /// <param name="pageSize"> 每页大小</param>
        /// <param name="SID">模块代号</param>
        /// <param name="strkey">   主键(a.id)</param>
        /// <param name="strFields">字段(a.id,a.key1,a.key2,b.key1,b.key2)</param>
        /// <param name="strWhere"> 条件(a.key1='a' and b.key1='b')</param>
        /// <param name="strOrder"> 排序(a.id asc,b.id desc)</param>
        /// <returns>JSON格式字符串</returns>
        public string GetPageToJsonForBootStarpPublicWindow(int pageIndex, int pageSize, string FORMNO, string strkey, string strWhere, string sortName, string sortOrder)
        {
            int totalcount = 0;
            dynamic list = null;
            //dynamic sqllist = null;
            using (IDbConnection conn = CreateConnection())
            {
                string sqlStr = string.Concat(@"
                    DECLARE @SQL VARCHAR(MAX)
                    SELECT @SQL=MK009 FROM dbo.SYSMK WHERE FORMNO='", FORMNO, @"'
                    EXEC('SELECT COUNT(*) from ('+@SQL+' ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" ", strWhere)), @" ) TEMP;
	                SELECT * FROM (SELECT ROW_NUMBER() OVER(ORDER BY ", (string.IsNullOrEmpty(sortName) ? HttpContext.Current.Server.UrlDecode(strkey) : HttpContext.Current.Server.UrlDecode(sortName)), " " + sortOrder + ") AS ROWID,* FROM ('+@SQL+' ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" ", strWhere)), @" ) TEMP) 
	                AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), @"'                 
                    
                    )");
                try
                {

                    conn.Open();
                    using (var multi = conn.QueryMultiple(sqlStr))
                    {
                        //multi.IsConsumed   reader的状态 ，true 是已经释放
                        if (!multi.IsConsumed)
                        {
                            totalcount = multi.Read<int>().FirstOrDefault();
                            list = multi.Read<dynamic>();
                            //sqllist= multi.Read<dynamic>();
                        }

                    }
                    return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", totalcount, ",\"rows\":", MZ_CORE.Msg.ToJson(list), "}");

                }
                catch (Exception ex)
                {
                    throw new Exception(sqlStr);
                    return "";
                }

            }
        }








        /// <summary>
        /// 获取分页数据json
        /// </summary>
        /// <param name="pageIndex">当前页</param>
        /// <param name="pageSize"> 每页大小</param>
        /// <param name="SID"> 数据源ID　(table1 a left join table2 b on a.id=b.id)</param>
        /// <param name="strkey">   主键(a.id)</param>
        /// <param name="strFields">字段(a.id,a.key1,a.key2,b.key1,b.key2)</param>
        /// <param name="strWhere"> 条件(a.key1='a' and b.key1='b')</param>
        /// <param name="strOrder"> 排序(a.id asc,b.id desc)</param>
        /// <returns>JSON格式字符串</returns>
        public string GetPageToJsonForBootStarpPublicWindowForMobileForMK(int pageIndex, int pageSize, string FORMNO, string strkey, string strWhere, string sortName, string strOrder, bool isSuperManger, string UserCode, string Access, string Range)
        {
            int totalcount = 0;
            dynamic list = null;

            //pageIndex = 1;
            //pageSize = int.MaxValue;
            bool AllUser = false;
            bool CurUser = false;
            bool AccUser = false;

            if (Range != "")
            {
                string[] temp = Range.Split('|');
                AllUser = temp[0] == "1" ? true : false;//全部用户
                CurUser = temp[1] == "1" ? true : false;//当前用户
                AccUser = temp[2] == "1" ? true : false;//权限用户
            }

            if (isSuperManger)//不是超级管理员
            {
                if (!AllUser)//如果没有选择所有用户
                {
                    if (CurUser && !AccUser)//如果只勾选了当前用户并且没有选择权限用户
                    {
                        strWhere += string.Format(@" And {1} in (''{0}'')", UserCode, Access);
                    }

                    if (CurUser && AccUser)//如果同时勾选了当前用户和权限用户
                    {
                        strWhere += string.Format(@" And {2} in (
                        SELECT ''{0}''
                        UNION ALL
                       SELECT DISTINCT MS003 FROM(
    
                        --角色数据权限人员
                        SELECT R.MR002 MS002, E.ME002, LOWER(E.ME005) ME005, R.MR003 MS003 FROM SYSMR R
                        JOIN SYSMI I ON R.MR001 = I.MI002 AND I.MI001 = ''{0}''
                        JOIN SYSMF F ON I.MI002 = F.MF001 AND F.MF003 = 1
                        JOIN SYSME E ON R.MR002 = E.ME001 AND E.ME007 = 1
                        WHERE R.MR004 = 0 AND R.MR002= ''{1}''
                        UNION ALL
                        --角色数据权限部门人员
                        SELECT R.MR002 MS002, E.ME002, LOWER(E.ME005) ME005, U.ACCOUNT MS003 FROM SYSMR R
                        JOIN SYSMI I ON R.MR001 = I.MI002 AND I.MI001 = ''{0}''
                        JOIN SYSMF F ON I.MI002 = F.MF001 AND F.MF003 = 1
                        JOIN SYSME E ON R.MR002 = E.ME001 AND E.ME007 = 1
                        LEFT JOIN SYSUSER U ON R.MR003 = U.DEPTGUID
                        WHERE R.MR004 = 1 AND R.MR002= ''{1}''
                        UNION ALL
                        --用户数据权限人员
                        SELECT S.MS002, E.ME002, LOWER(E.ME005) ME005, S.MS003 FROM SYSMS S
                        JOIN SYSME E ON S.MS001 = ''{0}'' AND S.MS002 = E.ME001 AND E.ME007 = 1
                        WHERE S.MS004 = 0 AND S.MS002= ''{1}''
                        UNION ALL
                        --用户数据权限部门人员
                        SELECT S.MS002, E.ME002, LOWER(E.ME005) ME005, U.ACCOUNT MS003 FROM SYSMS S
                        JOIN SYSME E ON S.MS001 = ''{0}'' AND S.MS002 = E.ME001 AND E.ME007 = 1
                        LEFT JOIN SYSUSER U ON S.MS003 = U.DEPTGUID
                        WHERE S.MS004 = 1 AND S.MS002= ''{1}''
                        ) T WHERE T.MS003 IS NOT NULL )
                        
                    ", UserCode, FORMNO, Access);
                    }
                    if (!CurUser && AccUser)//如果只勾选了权限用户并且没有选择当前用户
                    {
                        strWhere += string.Format(@" And {2} in (
                       SELECT DISTINCT MS003 FROM(
                        
    
                        --角色数据权限人员
                        SELECT R.MR002 MS002, E.ME002, LOWER(E.ME005) ME005, R.MR003 MS003 FROM SYSMR R
                        JOIN SYSMI I ON R.MR001 = I.MI002 AND I.MI001 = ''{0}''
                        JOIN SYSMF F ON I.MI002 = F.MF001 AND F.MF003 = 1
                        JOIN SYSME E ON R.MR002 = E.ME001 AND E.ME007 = 1
                        WHERE R.MR004 = 0 AND R.MR002= ''{1}''
                        UNION ALL
                        --角色数据权限部门人员
                        SELECT R.MR002 MS002, E.ME002, LOWER(E.ME005) ME005, U.ACCOUNT MS003 FROM SYSMR R
                        JOIN SYSMI I ON R.MR001 = I.MI002 AND I.MI001 = ''{0}''
                        JOIN SYSMF F ON I.MI002 = F.MF001 AND F.MF003 = 1
                        JOIN SYSME E ON R.MR002 = E.ME001 AND E.ME007 = 1
                        LEFT JOIN SYSUSER U ON R.MR003 = U.DEPTGUID
                        WHERE R.MR004 = 1 AND R.MR002= ''{1}''
                        UNION ALL
                        --用户数据权限人员
                        SELECT S.MS002, E.ME002, LOWER(E.ME005) ME005, S.MS003 FROM SYSMS S
                        JOIN SYSME E ON S.MS001 = ''{0}'' AND S.MS002 = E.ME001 AND E.ME007 = 1
                        WHERE S.MS004 = 0 AND S.MS002= ''{1}''
                        UNION ALL
                        --用户数据权限部门人员
                        SELECT S.MS002, E.ME002, LOWER(E.ME005) ME005, U.ACCOUNT MS003 FROM SYSMS S
                        JOIN SYSME E ON S.MS001 = ''{0}'' AND S.MS002 = E.ME001 AND E.ME007 = 1
                        LEFT JOIN SYSUSER U ON S.MS003 = U.DEPTGUID
                        WHERE S.MS004 = 1 AND S.MS002= ''{1}''
                         ) T WHERE T.MS003 IS NOT NULL )
                        
                    ", UserCode, FORMNO, Access);
                    }
                }
            }

            using (IDbConnection conn = CreateConnection())
            {
                try
                {
                    //   string sqlStr = string.Concat(@"
                    //   DECLARE @SQL VARCHAR(MAX)
                    //   SELECT @SQL=MK009 FROM dbo.SYSMK WHERE FORMNO='", FORMNO, @"'
                    //   EXEC('SELECT COUNT(*) from (select * from (SELECT * FROM ('+@SQL+') A ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), @") TEMP)TEMP;
                    //SELECT * FROM (SELECT ROW_NUMBER() OVER(ORDER BY ", (string.IsNullOrEmpty(sortName) ? HttpContext.Current.Server.UrlDecode(strkey) : HttpContext.Current.Server.UrlDecode(sortName)), " " + sortOrder + ") AS ROWID,* FROM (SELECT * FROM ('+@SQL+') A ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat(" WHERE 1=1 ", strWhere)), @" ) TEMP) 
                    //AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), "')");

                    string sqlStr = string.Concat(@"
                    DECLARE @SQL VARCHAR(MAX)
                    DECLARE @OrderField VARCHAR(50)
				    DECLARE @OrderType VARCHAR(50)
                    SELECT @SQL=MK009,@OrderField=udf09,@OrderType=udf10 FROM dbo.SYSMK WHERE FORMNO='", FORMNO, @"'
                    EXEC('SELECT COUNT(*) from (select * from ('+@SQL+' ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat("", strWhere)), @") a) TEMP;
	                SELECT * FROM (SELECT ROW_NUMBER() OVER(ORDER BY '+@OrderField+' '+@OrderType+') AS ROWID,* FROM (select * from ('+@SQL+' ", (string.IsNullOrEmpty(strWhere) ? "" : string.Concat("", strWhere)), @") a) TEMP) 
	                AS TEMPTABLE WHERE ROWID >= ", ((pageIndex - 1) * pageSize + 1), " AND ROWID<= ", (pageIndex * pageSize), "')");



                    conn.Open();
                    using (var multi = conn.QueryMultiple(sqlStr))
                    {
                        //multi.IsConsumed   reader的状态 ，true 是已经释放
                        if (!multi.IsConsumed)
                        {
                            totalcount = multi.Read<int>().FirstOrDefault();
                            list = multi.Read<dynamic>();
                        }
                    }
                    return string.Concat("{\"RST\":\"SUC\",\"ICO\":\"1\",\"MSG\":\"查询成功\",\"total\":", totalcount, ",\"rows\":", MZ_CORE.Msg.ToJson(list), "}");
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }













    }
}
