using System;
using System.Data;
using System.Data.OleDb;

namespace MZ_CORE
{
    public class Excel
    {
        #region 读取Excel表数据
        /// <summary>
        /// 读取Excel数据
        /// </summary>
        /// <param name="path">文件路径</param>
        /// <param name="fileExtName">excel后缀</param>
        /// <returns>返回工作表数据</returns>
        public static DataTable ExcelToDataTable(string path, string fileExtName)
        {
            //xls  HDR=YES/NO 第一行是标题   IMEX 0:写入，1读取，2写入读取 
            string strConn = "";
            switch (fileExtName)
            {
                case "xls":
                    strConn = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + path + ";Extended Properties='Excel 8.0;HDR=YES;IMEX=1'";
                    break;
                case "xlsx":
                    strConn = "Provider=Microsoft.Ace.OleDb.12.0;Data Source=" + path + ";Extended Properties='Excel 12.0;HDR=YES;IMEX=1'";
                    break;
            }
            try
            {
                using (OleDbConnection conn = new OleDbConnection(strConn))
                {
                    conn.Open();
                    DataTable schemaTable = conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, new Object[] { null, null, null, "TABLE" });
                    #region 任意工作表
                    //DataSet ds = null;
                    //string SheetName = null;
                    //for (int i = 0; i < schemaTable.Rows.Count; i++)
                    //{
                    //    try
                    //    {
                    //        SheetName = schemaTable.Rows[i]["TABLE_NAME"].ToString().Trim('\'').Replace("$", "") + "$";
                    //        OleDbDataAdapter adapter = new OleDbDataAdapter(string.Format(string.Concat("select * from[{0}]"), SheetName), strConn);
                    //        ds = new DataSet();
                    //        adapter.Fill(ds, SheetName);
                    //        break;
                    //    }
                    //    catch
                    //    {
                    //        continue;
                    //    }
                    //}
                    //return ds.Tables[SheetName];
                    #endregion

                    #region 只读第一个工作表
                    if (schemaTable != null && schemaTable.Rows.Count > 0)
                    {
                        string SheetName = schemaTable.Rows[0]["TABLE_NAME"].ToString().Trim('\'').Replace("$", "") + "$";
                        OleDbDataAdapter adapter = new OleDbDataAdapter(string.Format(string.Concat("select * from[{0}]"), SheetName), strConn);
                        DataSet ds = new DataSet();
                        adapter.Fill(ds, SheetName);
                        return ds.Tables[SheetName];
                    }
                    else
                    {
                        return null;
                    }
                    #endregion
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region 读取Excel表数据
        /// <summary>
        /// 读取Excel数据
        /// </summary>
        /// <param name="path">文件路径</param>
        /// <param name="fileExtName">excel后缀</param>
        /// <returns>返回工作表数据</returns>
        public static DataTable ExcelToDataTable1(string path, string fileExtName)
        {
            //xls  HDR=YES/NO 第一行是标题   IMEX 0:写入，1读取，2写入读取 
            string strConn = "";
            switch (fileExtName)
            {
                case "xls":
                    strConn = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + path + ";Extended Properties='Excel 8.0;HDR=YES;IMEX=1'";
                    break;
                case "xlsx":
                    strConn = "Provider=Microsoft.Ace.OleDb.12.0;Data Source=" + path + ";Extended Properties='Excel 12.0;HDR=YES;IMEX=1'";
                    break;
            }
            try
            {
                using (OleDbConnection conn = new OleDbConnection(strConn))
                {
                    conn.Open();
                    DataTable schemaTable = conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, new Object[] { null, null, null, "TABLE" });
                    #region 任意工作表
                    //DataSet ds = null;
                    //string SheetName = null;
                    //for (int i = 0; i < schemaTable.Rows.Count; i++)
                    //{
                    //    try
                    //    {
                    //        SheetName = schemaTable.Rows[i]["TABLE_NAME"].ToString().Trim('\'').Replace("$", "") + "$";
                    //        OleDbDataAdapter adapter = new OleDbDataAdapter(string.Format(string.Concat("select * from[{0}]"), SheetName), strConn);
                    //        ds = new DataSet();
                    //        adapter.Fill(ds, SheetName);
                    //        break;
                    //    }
                    //    catch
                    //    {
                    //        continue;
                    //    }
                    //}
                    //return ds.Tables[SheetName];
                    #endregion

                    #region 只读第一个工作表
                    if (schemaTable != null && schemaTable.Rows.Count > 0)
                    {
                        string SheetName = schemaTable.Rows[0]["TABLE_NAME"].ToString().Trim('\'').Replace("$", "") + "$";
                        OleDbDataAdapter adapter = new OleDbDataAdapter(string.Format(string.Concat("select * from[{0}]"), SheetName), strConn);
                        DataSet ds = new DataSet();
                        adapter.Fill(ds, SheetName);
                        ds.Tables[0].Rows.RemoveAt(0);
                        return ds.Tables[SheetName];
                    }
                    else
                    {
                        return null;
                    }
                    #endregion
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
    }
}
