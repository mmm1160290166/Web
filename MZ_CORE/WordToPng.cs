using System.IO;
using System.Runtime.InteropServices;
using System.Drawing.Imaging;
using System.Drawing;
using System;
using Microsoft.Office.Interop.Word;

namespace MZ_CORE
{
    public class WordToPng
    {
        public void SaveToImages(object path)
        {
            object MissingValue = Type.Missing;
            object oMissing = System.Reflection.Missing.Value;
            Application wordApp = new Application();
            Document document = wordApp.Documents.Open(ref path,
                ref MissingValue, ref MissingValue, ref MissingValue,
                ref MissingValue, ref MissingValue, ref MissingValue,
                ref MissingValue, ref MissingValue, ref MissingValue,
                ref MissingValue, ref MissingValue, ref MissingValue,
                ref MissingValue, ref MissingValue, ref MissingValue);
            try
            {
                if (document.Windows.Count > 0 && document.Windows[1].Panes.Count > 0)
                {
                    Pane pane = document.Windows[1].Panes[1];
                    Bitmap[] arrPic = new Bitmap[pane.Pages.Count];
                    for (var i = 1; i <= pane.Pages.Count;)
                    {
                        Page p = null;
                        try
                        {
                            p = pane.Pages[i];
                        }
                        catch { continue; }
                        object bits = p.EnhMetaFileBits;
                        using (MemoryStream ms = new MemoryStream((byte[])(bits)))
                        {
                            arrPic[i - 1] = new Bitmap(Bitmap.FromStream(ms));
                        }
                        i++;
                    }
                    MergerImg(arrPic, Path.GetDirectoryName(path.ToString()) + "\\" + Path.GetFileNameWithoutExtension(path.ToString()) + ".png");
                }
            }
            catch (Exception ex) { throw ex; }
            finally
            {
                document.Close(ref oMissing, ref oMissing, ref oMissing);
                System.Runtime.InteropServices.Marshal.ReleaseComObject(document);
                document = null;
                wordApp.Quit(ref oMissing, ref oMissing, ref oMissing);
                System.Runtime.InteropServices.Marshal.ReleaseComObject(wordApp);
                wordApp = null;
                System.GC.Collect();
            }
        }

        //图片合并
        static void MergerImg(Bitmap[] arrMap, string filepath)
        {
            int len = arrMap.Length;
            if (len == 0)
            {
                return;
            }
            int maxWidth = 0;
            int sumHeight = 0;
            //大小占百分比
            double persent = 0.25;
            for (int i = 0; i < len; i++)
            {
                maxWidth = Math.Max(maxWidth, arrMap[i].Width);
                sumHeight += arrMap[i].Height;
            }
            maxWidth = (int)(maxWidth * persent);
            sumHeight = (int)(sumHeight * persent);
            Bitmap bgImg = new Bitmap(maxWidth, sumHeight);
            Graphics g = Graphics.FromImage(bgImg);
            g.Clear(Color.White);
            int gHeight = 0;
            for (int i = 0; i < len; i++)
            {
                gHeight = i == 0 ? 0 : gHeight = arrMap[i - 1].Height + gHeight;
                g.DrawImage(arrMap[i], 0, (int)(gHeight * persent), (int)(arrMap[i].Width * persent), (int)(arrMap[i].Height * persent));
            }
            g.Dispose();
            bgImg.Save(filepath, ImageFormat.Png);
        }
    }
}
