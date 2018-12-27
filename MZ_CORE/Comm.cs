using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Data;
using System.Web.Script.Serialization;
using System.Collections;
using Newtonsoft.Json;
using System.IO;
using System.Xml;

namespace MZ_CORE
{
    public class Comm
    {
        public static string Md5(string str)
        {
            Byte[] clearBytes = Encoding.Default.GetBytes(str);
            Byte[] hashedBytes = ((HashAlgorithm)CryptoConfig.CreateFromName("MD5")).ComputeHash(clearBytes);
            return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        }

        public static string GetMd5Hash(string str)
        {
            MD5 md5Hasher = MD5.Create();
            byte[] data = md5Hasher.ComputeHash(Encoding.Default.GetBytes(str));
            StringBuilder sBuilder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            return sBuilder.ToString();
        }

        /// <summary>
        /// json转换成dataset
        /// </summary>
        /// <param name="Json"></param>
        /// <returns></returns>
        public static DataSet JsonToDataSet(string Json)
        {
            try
            {
                DataSet ds = new DataSet();
                Dictionary<string, object> datajson = (Dictionary<string, object>)new JavaScriptSerializer().DeserializeObject(Json);
                foreach (var item in datajson)
                {
                    DataTable dt = new DataTable(item.Key);
                    object[] rows = (object[])item.Value;
                    foreach (var row in rows)
                    {
                        Dictionary<string, object> val = (Dictionary<string, object>)row;
                        DataRow dr = dt.NewRow();
                        foreach (KeyValuePair<string, object> sss in val)
                        {
                            if (!dt.Columns.Contains(sss.Key))
                            {
                                dt.Columns.Add(sss.Key.ToString());
                                dr[sss.Key] = sss.Value;
                            }
                            else
                                dr[sss.Key] = sss.Value;
                        }
                        dt.Rows.Add(dr);
                    }
                    ds.Tables.Add(dt);
                }
                return ds;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        /// <summary>
        /// 读取License文件
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string ReadLicense(string path, int Flag)
        {
            string FileText = "";
            if (File.Exists(path))
            {
                string FileAllText = File.ReadAllText(path);
                if (!string.IsNullOrEmpty(FileAllText))
                {
                    FileText = FileAllText.Split('◎')[Flag].ToString();
                }
            }
            return FileText;
        }

        #region DES 加密
        public static string DESEncrypt(string encryptString)
        {
            try
            {
                byte[] rgbKey = Encoding.UTF8.GetBytes("$qnmlgb#");
                byte[] rgbIV = rgbKey;
                byte[] inputByteArray = Encoding.UTF8.GetBytes(encryptString);
                DESCryptoServiceProvider dCSP = new DESCryptoServiceProvider();
                MemoryStream mStream = new MemoryStream();
                CryptoStream cStream = new CryptoStream(mStream, dCSP.CreateEncryptor(rgbKey, rgbIV), CryptoStreamMode.Write);
                cStream.Write(inputByteArray, 0, inputByteArray.Length);
                cStream.FlushFinalBlock();
                cStream.Close();
                return Convert.ToBase64String(mStream.ToArray());
            }
            catch
            {
                return encryptString;
            }
        }
        #endregion

        #region DES 解密
        public static string DESDecrypt(string decryptString)
        {
            try
            {
                byte[] rgbKey = Encoding.UTF8.GetBytes("$qnmlgb#");
                byte[] rgbIV = rgbKey;
                byte[] inputByteArray = Convert.FromBase64String(decryptString);
                DESCryptoServiceProvider DCSP = new DESCryptoServiceProvider();
                MemoryStream mStream = new MemoryStream();
                CryptoStream cStream = new CryptoStream(mStream, DCSP.CreateDecryptor(rgbKey, rgbIV), CryptoStreamMode.Write);
                cStream.Write(inputByteArray, 0, inputByteArray.Length);
                cStream.FlushFinalBlock();
                cStream.Close();
                return Encoding.UTF8.GetString(mStream.ToArray());
            }
            catch
            {
                return decryptString;
            }
        }
        #endregion

        /// <summary>
        /// Base64编码
        /// </summary>
        public static string Base64Encode(string str)
        {
            try { return str.Length > 0 ? Convert.ToBase64String(Encoding.UTF8.GetBytes(str)) : ""; }
            catch { return ""; }
        }
        /// <summary>
        /// Base64解码
        /// </summary>
        public static string Base64Decode(string code)
        {
            try { return code.Length > 0 ? Encoding.UTF8.GetString(Convert.FromBase64String(code)) : ""; }
            catch { return ""; }
        }

        public static XmlNodeList ReadXMLString(string str, string selectnode)
        {
            if (str != "")
            {
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(str); //加载xml

                XmlNodeList NodeList = xmlDoc.SelectNodes(selectnode);
                return NodeList;
            }
            else
            {
                return null;
            }

        }
        /// <summary>  
        /// 写入日志到文本文件  
        /// </summary>  
        /// <param name="action">动作</param>  
        /// <param name="strMessage">日志内容</param>  
        /// <param name="time">时间</param>  
        public static void WriteTextLog(string action, string strMessage, DateTime time)
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + @"Log\";
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            string fileFullPath = path + time.ToString("yyyy-MM-dd") + ".Log.txt";
            FileInfo fileinfo = new FileInfo(fileFullPath);
            StringBuilder str = new StringBuilder();
            str.Append("Time:    " + time.ToString() + "\r\n");
            str.Append("Type:  " + action + "\r\n");
            str.Append("Message: " + strMessage + "\r\n");
            str.Append("-----------------------------------------------------------\r\n\r\n");
            StreamWriter sw;
            if (!File.Exists(fileFullPath))
            {
                sw = File.CreateText(fileFullPath);
            }
            else
            {
                sw = File.AppendText(fileFullPath);
            }
            sw.WriteLine(str.ToString());
            sw.Close();
        }
    }
}
