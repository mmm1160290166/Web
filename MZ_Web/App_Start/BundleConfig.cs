using System.Web.Optimization;

namespace MZ_Web
{
    public class BundleConfig
    {
        // 有关绑定的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //Jqeury
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/nifty/js/jquery-2.2.4.min.js"));
            //LayerJs
            bundles.Add(new ScriptBundle("~/bundles/layer/js").Include("~/nifty/Layer/layui.js"));
            //LayerCss
            bundles.Add(new StyleBundle("~/bundles/layer/css").Include("~/nifty/Layer/css/layui.css"));
        }
    }
}
