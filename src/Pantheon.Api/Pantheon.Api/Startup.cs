using System;
using System.Collections.Generic;
using System.ComponentModel;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Pantheon.Api.Extensions;
using Pantheon.Api.TokenAuthentication;
using Pantheon.AppService;
using Pantheon.AppService.Configuration;
using Pantheon.Api.Utilities;

namespace Pantheon.Api
{
    public partial class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddMvc();
            // Add service and create Policy with options
            services.AddCors(options => {
                options.AddPolicy("AllowAll",
                    builder => {
                        builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials();
                    });
            });
            IocRegister.RegisterServices(services);

            // Add framework services.
            services.AddMvc().AddJsonOptions(a => a.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());
            services.AddMvc().AddJsonOptions(a => a.SerializerSettings.Converters = new List<JsonConverter> { new Utilities.DecimalConverter() });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("UserRole", policy => policy.RequireClaim(CoreServiceConstants.IdentityClaims.LoginUserId));
                options.AddPolicy("AdminAdminRole", policy => policy.RequireClaim(CoreServiceConstants.IdentityClaims.IsAdmin));
            });

            // Bind Settings from config file
            services.Configure<TokenAuthSettings>(Configuration.GetSection("TokenAuthentication"));
            services.Configure<WebCoreSettings>(Configuration.GetSection("WebCoreSettings"));

            // Adds a default in-memory implementation of IDistributedCache.
            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.Cookie.Name = ".WebCore.Session";
                options.IdleTimeout = TimeSpan.FromMinutes(30);
            });

            services.AddAutoMapper();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IServiceCollection services, IOptionsSnapshot<TokenAuthSettings> tokenSettings)
        {
            // add CurrentRequestContextMiddleware.
            app.UseCurrentRequestContext();
            app.UseSession();


            // global policy - assign here or on each controller
            app.UseCors("AllowAll");

            ConfigureAuth(app, services, tokenSettings.Value);//configure Token Authentication
            app.UseAuthenticateRequestMiddleware();

            app.UseMvcWithDefaultRoute();
        }
    }
}
