using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MZ_Web.Startup))]
namespace MZ_Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
