using System.Collections.Generic;

namespace MZ_CORE
{
    public class WordHelper
    {
        public Microsoft.Office.Interop.Word.ApplicationClass wordApp;
        public Microsoft.Office.Interop.Word.Document wordDoc;
        object missing = System.Reflection.Missing.Value;
        public Microsoft.Office.Interop.Word.ApplicationClass WordApplication
        {
            get { return wordApp; }
        }

        public Microsoft.Office.Interop.Word.Document WordDocument
        {
            get { return wordDoc; }
        }

        public WordHelper()
        {
            wordApp = new Microsoft.Office.Interop.Word.ApplicationClass();
        }

        public WordHelper(Microsoft.Office.Interop.Word.ApplicationClass wordApplication)
        {
            wordApp = wordApplication;
        }

        public void CreateAndActive()
        {
            wordDoc = CreateOneDocument(missing, missing, missing, missing);
            wordDoc.Activate();
        }

        public bool OpenAndActive(string FileName, bool IsReadOnly, bool IsVisibleWin)
        {
            if (string.IsNullOrEmpty(FileName))
            {
                return false;
            }
            try
            {
                wordDoc = OpenOneDocument(FileName, missing, IsReadOnly, missing, missing, missing, missing, missing, missing, missing, missing, IsVisibleWin, missing, missing, missing, missing);
                wordDoc.Activate();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Close()
        {
            if (wordDoc != null)
            {
                wordDoc.Close(ref missing, ref missing, ref missing);
                wordApp.Application.Quit(ref missing, ref missing, ref missing);
            }
        }

        public void Save()
        {
            if (wordDoc == null)
            {
                wordDoc = wordApp.ActiveDocument;
            }
            wordDoc.Save();
        }

        public void SaveAs(string FileName)
        {
            if (wordDoc == null)
            {
                wordDoc = wordApp.ActiveDocument;
            }
            object objFileName = FileName;
            wordDoc.SaveAs(ref objFileName, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing,
                ref missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing);
        }

        public Microsoft.Office.Interop.Word.Document CreateOneDocument(object template, object newTemplate, object documentType, object visible)
        {
            return wordDoc = wordApp.Documents.Add(ref template, ref newTemplate, ref documentType, ref visible);//_wordApplication
        }

        public Microsoft.Office.Interop.Word.Document OpenOneDocument(object FileName, object ConfirmConversions, object ReadOnly,
            object AddToRecentFiles, object PasswordDocument, object PasswordTemplate, object Revert,
            object WritePasswordDocument, object WritePasswordTemplate, object Format, object Encoding,
            object Visible, object OpenAndRepair, object DocumentDirection, object NoEncodingDialog, object XMLTransform)
        {
            try
            {
                return wordApp.Documents.Open(ref FileName, ref ConfirmConversions, ref ReadOnly, ref AddToRecentFiles,
                   ref PasswordDocument, ref PasswordTemplate, ref Revert, ref WritePasswordDocument, ref WritePasswordTemplate,
                   ref Format, ref Encoding, ref Visible, ref OpenAndRepair, ref DocumentDirection, ref NoEncodingDialog, ref XMLTransform);
            }
            catch
            {
                return null;
            }
        }

        public bool GoToBookMark(string bookMarkName)
        {
            //是否存在书签
            if (wordDoc.Bookmarks.Exists(bookMarkName))
            {
                object what = Microsoft.Office.Interop.Word.WdGoToItem.wdGoToBookmark;
                object name = bookMarkName;
                GoTo(what, missing, missing, name);
                return true;
            }
            return false;
        }

        public void GoTo(object what, object which, object count, object name)
        {
            wordApp.Selection.GoTo(ref what, ref which, ref count, ref name);
        }

        public void ReplaceBookMark(Dictionary<string, string> dic)
        {
            foreach (KeyValuePair<string, string> item in dic)
            {
                ReplaceBookMark(item.Key, item.Value);
            }
        }

        public void ReplaceBookMark(string bookMarkName, string text)
        {
            bool isExist = GoToBookMark(bookMarkName);
            if (isExist)
            {
                InsertText(text);
            }
        }

        public void InsertText(string text)
        {
            wordApp.Selection.TypeText(text);
        }
    }
}
