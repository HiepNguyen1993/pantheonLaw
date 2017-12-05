using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;

namespace Pantheon.Api.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        /// <summary>
        /// Enable <see cref="BravoHttpContext.Current"/> in the current request with adding <see cref="CurrentRequestContextMiddleware"/> to the application's request pipeline.
        /// </summary>
        /// <param name="builder">The application's request pipeline.</param>
        /// <returns>The application's request pipeline added <see cref="CurrentRequestContextMiddleware"/>.</returns>
        public static IApplicationBuilder UseCurrentRequestContext(this IApplicationBuilder builder)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            return builder.UseMiddleware<CurrentRequestContextMiddleware>();
        }

        public static IApplicationBuilder UseAuthenticateRequestMiddleware(this IApplicationBuilder builder)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            return builder.UseMiddleware<AuthenticateRequestMiddleware>();
        }
    }
}