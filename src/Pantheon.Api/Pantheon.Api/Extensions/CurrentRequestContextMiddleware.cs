using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Pantheon.Api.Extensions
{
    
    /// <summary>
    /// Enable using <see cref="WebHttpContext.Current"/>. 
    /// </summary>
    public class CurrentRequestContextMiddleware
    {
        private readonly RequestDelegate _next;

        /// <summary>
        /// Create a new instance of <see cref="CurrentRequestContextMiddleware"/>.
        /// </summary>
        /// <param name="next">The next middleware in the pipeline.</param>
        public CurrentRequestContextMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        /// <summary>
        /// Execute the application's request pipeline.
        /// </summary>
        /// <param name="context"><see cref="HttpContext"/> in this request.</param>
        /// <returns>The task.</returns>
        public async Task Invoke(HttpContext context)
        {
            await _next(context);
        }
    }
    }
