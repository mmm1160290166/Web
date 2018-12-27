using iTextSharp.text.pdf;
using System;
using System.Diagnostics;
using System.IO;
using System.Web;

namespace MZ_CORE
{
    public class FileConvert
    {
        /// <summary>
        /// word转PDF
        /// </summary>
        /// <param name="sourcePath">源文件路径</param>
        /// <param name="targetPath">转换后路径</param>
        /// <param name="exportFormat"></param>
        /// <returns></returns>
        public static bool Convert(string sourcePath, string targetPath, Microsoft.Office.Interop.Word.WdExportFormat exportFormat)
        {
            bool result;
            object paramMissing = Type.Missing;
            Microsoft.Office.Interop.Word.ApplicationClass wordApplication = new Microsoft.Office.Interop.Word.ApplicationClass();
            Microsoft.Office.Interop.Word.Document wordDocument = null;
            try
            {
                object paramSourceDocPath = sourcePath;
                string paramExportFilePath = targetPath;
                Microsoft.Office.Interop.Word.WdExportFormat paramExportFormat = exportFormat;
                Microsoft.Office.Interop.Word.WdExportOptimizeFor paramExportOptimizeFor = Microsoft.Office.Interop.Word.WdExportOptimizeFor.wdExportOptimizeForPrint;
                Microsoft.Office.Interop.Word.WdExportRange paramExportRange = Microsoft.Office.Interop.Word.WdExportRange.wdExportAllDocument;
                Microsoft.Office.Interop.Word.WdExportItem paramExportItem = Microsoft.Office.Interop.Word.WdExportItem.wdExportDocumentContent;
                Microsoft.Office.Interop.Word.WdExportCreateBookmarks paramCreateBookmarks = Microsoft.Office.Interop.Word.WdExportCreateBookmarks.wdExportCreateWordBookmarks;
                wordDocument = wordApplication.Documents.Open(ref paramSourceDocPath, ref paramMissing, ref paramMissing, ref paramMissing, ref paramMissing, ref paramMissing, ref paramMissing, ref paramMissing, ref paramMissing, ref paramMissing, ref paramMissing, ref paramMissing, ref paramMissing, ref paramMissing, ref paramMissing, ref paramMissing);
                if (wordDocument != null) { wordDocument.ExportAsFixedFormat(paramExportFilePath, paramExportFormat, false, paramExportOptimizeFor, paramExportRange, 0, 0, paramExportItem, true, true, paramCreateBookmarks, true, true, false, ref paramMissing); }
                result = true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (wordDocument != null)
                {
                    wordDocument.Close(ref paramMissing, ref paramMissing, ref paramMissing);
                    wordDocument = null;
                }
                if (wordApplication != null)
                {
                    wordApplication.Quit(ref paramMissing, ref paramMissing, ref paramMissing);
                    wordApplication = null;
                }
                GC.Collect();
                GC.WaitForPendingFinalizers();
                GC.Collect();
                GC.WaitForPendingFinalizers();
            }
            return result;
        }

        /// <summary>
        /// excel转PDF
        /// </summary>
        /// <param name="sourcePath">源文件路径</param>
        /// <param name="targetPath">转换后路径</param>
        /// <param name="targetType"></param>
        /// <returns></returns>
        public static bool Convert(string sourcePath, string targetPath, Microsoft.Office.Interop.Excel.XlFixedFormatType targetType)
        {
            bool result;
            object missing = Type.Missing;
            Microsoft.Office.Interop.Excel.Application application = new Microsoft.Office.Interop.Excel.ApplicationClass();
            Microsoft.Office.Interop.Excel.Workbook workBook = null;
            try
            {
                object target = targetPath;
                object type = targetType;
                workBook = application.Workbooks.Open(sourcePath, missing, missing, missing, missing, missing, missing, missing, missing, missing, missing, missing, missing, missing, missing);
                workBook.ExportAsFixedFormat(targetType, target, Microsoft.Office.Interop.Excel.XlFixedFormatQuality.xlQualityStandard, true, false, missing, missing, missing, missing);
                result = true;
            }
            catch (Exception ex)
            {
                result = false;
            }
            finally
            {
                if (workBook != null)
                {
                    workBook.Close(true, missing, missing);
                    workBook = null;
                }
                if (application != null)
                {
                    application = null;
                }
                GC.Collect();
                GC.WaitForPendingFinalizers();
                GC.Collect();
                GC.WaitForPendingFinalizers();
            }
            return result;
        }

        /// <summary>
        /// ppt转PDF
        /// </summary>
        /// <param name="sourcePath">源文件路径</param>
        /// <param name="targetPath">转换后路径</param>
        /// <param name="targetFileType"></param>
        /// <returns></returns>
        public static bool Convert(string sourcePath, string targetPath, Microsoft.Office.Interop.PowerPoint.PpSaveAsFileType targetFileType)
        {
            bool result;
            object missing = Type.Missing;
            Microsoft.Office.Interop.PowerPoint.ApplicationClass application = new Microsoft.Office.Interop.PowerPoint.ApplicationClass();
            Microsoft.Office.Interop.PowerPoint.Presentation persentation = null;
            try
            {
                persentation = application.Presentations.Open(sourcePath, Microsoft.Office.Core.MsoTriState.msoTrue, Microsoft.Office.Core.MsoTriState.msoFalse, Microsoft.Office.Core.MsoTriState.msoFalse);
                persentation.SaveAs(targetPath, targetFileType, Microsoft.Office.Core.MsoTriState.msoTrue);
                result = true;
            }
            catch
            {
                result = false;
            }
            finally
            {
                if (persentation != null)
                {
                    persentation.Close();
                    persentation = null;
                }
                if (application != null)
                {
                    application.Quit();
                    application = null;
                }
                GC.Collect();
                GC.WaitForPendingFinalizers();
                GC.Collect();
                GC.WaitForPendingFinalizers();
            }
            return result;
        }

        /// <summary>
        /// Image转PDF
        /// </summary>
        /// <param name="sourcePath">源文件路径</param>
        /// <param name="targetPath">转换后路径</param>
        public static bool Convert(string sourcePath, string targetPath)
        {
            try
            {
                iTextSharp.text.Document document = new iTextSharp.text.Document();
                using (FileStream stream = new FileStream(targetPath, FileMode.Create, FileAccess.Write, FileShare.None))
                {
                    PdfWriter.GetInstance(document, stream);
                    document.Open();
                    using (FileStream imageStream = new FileStream(sourcePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                    {
                        iTextSharp.text.Image image = iTextSharp.text.Image.GetInstance(imageStream);
                        if (image.Height > iTextSharp.text.PageSize.A4.Height - 25)
                        {
                            image.ScaleToFit(iTextSharp.text.PageSize.A4.Width - 25, iTextSharp.text.PageSize.A4.Height - 25);
                        }
                        else if (image.Width > iTextSharp.text.PageSize.A4.Width - 25)
                        {
                            image.ScaleToFit(iTextSharp.text.PageSize.A4.Width - 25, iTextSharp.text.PageSize.A4.Height - 25);
                        }
                        image.Alignment = iTextSharp.text.Image.ALIGN_MIDDLE;
                        document.Add(image);
                    }
                    document.Close();
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static void PDFConvertToSWF(string pdfPath, string swfPath)
        {
            string cmdStr = HttpContext.Current.Server.MapPath("~/SWFTools/pdf2swf.exe");
            string argsStr = string.Concat(" -f -t \"", pdfPath, "\"", " -s flashversion=9 -o \"", swfPath, "\"");
            ExecuteCmd(cmdStr, argsStr);
        }

        public static void ExecuteCmd(string cmd, string args)
        {
            using (Process p = new Process())
            {
                p.StartInfo.FileName = cmd;
                p.StartInfo.Arguments = args;
                p.StartInfo.UseShellExecute = false;
                p.StartInfo.RedirectStandardOutput = false;
                p.StartInfo.CreateNoWindow = true;
                p.Start();
                p.PriorityClass = ProcessPriorityClass.Normal;
                p.WaitForExit();
            }
        }
    }
}
