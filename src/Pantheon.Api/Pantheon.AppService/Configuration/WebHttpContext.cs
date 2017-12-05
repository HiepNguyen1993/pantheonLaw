
using System;
using System.Threading;
using Microsoft.AspNetCore.Http;

namespace Pantheon.AppService.Configuration
{
    /// <summary>
    /// The class that manages <see cref="HttpContext"/> in the current request.
    /// </summary>
    class WebHttpContext
    {
        private static readonly AsyncLocal<HttpContext> _context = new AsyncLocal<HttpContext>();

        /// <summary>
        /// Get <see cref="HttpContext"/> in this request.
        /// </summary>
        public static HttpContext Current
        {
            get
            {
                if (_context.Value == null)
                {
                    throw new InvalidOperationException(
                        $"Could not acuire {nameof(HttpContext)} in the current request. You may not add CurrentRequestContextMiddleware in Startup.");
                }

                return _context.Value;
            }
            set { _context.Value = value; }
        }

        public static string UserName
        {
            get
            {
                var userName = String.Empty;
                // Figure out the user's identity
                var identity = Current?.User?.Identity;

                if (identity != null && identity.IsAuthenticated)
                {
                    userName = Current.User.FindFirst(CoreServiceConstants.IdentityClaims.UserName)?.Value;
                }

                return userName;
            }
        }
    }
}