using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pantheon.Api.TokenAuthentication
{
    public class TokenAuthSettings
    {
        public string SecretKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string TokenPath { get; set; }
        public string CookieName { get; set; }
        public double Expiration { get; set; }
    }
}
