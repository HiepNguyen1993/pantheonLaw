using System;
using System.Collections.Generic;
using System.Text;

namespace Pantheon.AppService.Configuration
{
    public class WebCoreSettings
    {
        public string SecretKey { get; set; }
        public string AppName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string IsSSL { get; set; }
        public string ClientUrl { get; set; }
        public string SMTP_FROM { get; set; }
        public string SMTP_TO { get; set; }
        public string SMTP_FULLNAME { get; set; }
        public string SMTP_PASSWORD { get; set; }
        public string SMTP_PORT { get; set; }
        public string SMTP_SERVER { get; set; }
        public string SMTP_LOGIN { get; set; }
    }
}
