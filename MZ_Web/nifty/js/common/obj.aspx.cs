using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PDOA.Web.Scripts.common
{
    public partial class obj : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            switch (Request.QueryString["action"])
            {
                case "list":
                    Response.Write(string.Concat("{\"rows\":[{\"ID\":\"1\",\"USERNAME\":\"tangsi\",\"USERPWD\":\"tangsi\",\"USEREMAIL\":\"526107103@qq.com\"},{\"ID\":\"2\",\"USERNAME\":\"tangsi\",\"USERPWD\":\"tangsi\",\"USEREMAIL\":\"526107103@qq.com\"},{\"ID\":\"3\",\"USERNAME\":\"tangsi\",\"USERPWD\":\"tangsi\",\"USEREMAIL\":\"526107103@qq.com\"},{\"ID\":\"4\",\"USERNAME\":\"tangsi\",\"USERPWD\":\"tangsi\",\"USEREMAIL\":\"526107103@qq.com\"},{\"ID\":\"5\",\"USERNAME\":\"tangsi\",\"USERPWD\":\"tangsi\",\"USEREMAIL\":\"526107103@qq.com\"}]}"));
                    break;
                case "pagelist":
                    int pageindex = int.Parse((Request.Form["pageindex"] == null || string.IsNullOrEmpty(Request.Form["pageindex"])) ? "1" : Request.Form["pageindex"]);
                    pageindex = (pageindex - 1) * 5;
                    Response.Write(string.Concat("{\"totalcount\":500,\"pagecount\":\"100\",\"pageindex\":\"1\",\"rows\":[{\"ID\":\"", pageindex + 1, "\",\"USERNAME\":\"tangsi\",\"USERPWD\":\"tangsi\",\"USEREMAIL\":\"526107103@qq.com\"},{\"ID\":\"", pageindex + 2, "\",\"USERNAME\":\"tangsi\",\"USERPWD\":\"tangsi\",\"USEREMAIL\":\"526107103@qq.com\"},{\"ID\":\"", pageindex + 3, "\",\"USERNAME\":\"tangsi\",\"USERPWD\":\"tangsi\",\"USEREMAIL\":\"526107103@qq.com\"},{\"ID\":\"", pageindex + 4, "\",\"USERNAME\":\"tangsi\",\"USERPWD\":\"tangsi\",\"USEREMAIL\":\"526107103@qq.com\"},{\"ID\":\"", pageindex + 5, "\",\"USERNAME\":\"tangsi\",\"USERPWD\":\"tangsi\",\"USEREMAIL\":\"526107103@qq.com\"}]}"));
                    break;
            }
        }
    }
}