using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Pantheon.AppService.Configuration
{
    class WebCoreGlobals
    {
        private static IHostingEnvironment _hostingEnvironment;
        public static void BravoInitialize(IApplicationBuilder app, IHostingEnvironment env, WebCoreSettings webCoreSettings)
        {
            _hostingEnvironment = env;
        }

        public static string WebRootPath()
        {
            return _hostingEnvironment.WebRootPath;
        }
    }
}
