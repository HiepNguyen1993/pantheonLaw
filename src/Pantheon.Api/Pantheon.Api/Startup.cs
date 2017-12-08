using System;
using System.Collections.Generic;
using System.ComponentModel;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Pantheon.Api.Extensions;
using Pantheon.Api.TokenAuthentication;
using Pantheon.AppService;
using Pantheon.AppService.Configuration;

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

            services.Configure<WebCoreSettings>(Configuration.GetSection("CoreSettings"));

            // configure identity server with in-memory stores, keys, clients and resources
            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryIdentityResources(IdentityServerConfig.GetIdentityResources())
                .AddInMemoryClients(IdentityServerConfig.GetClients());

            MongoDBContext.ConnectionString = Configuration.GetSection("CoreSettings:ConnectionString").Value;
            MongoDBContext.DatabaseName = Configuration.GetSection("CoreSettings:DatabaseName").Value;
            MongoDBContext.IsSSL = Convert.ToBoolean(Configuration.GetSection("CoreSettings:IsSSL").Value);



            services.AddAutoMapper();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // add CurrentRequestContextMiddleware.
            app.UseCurrentRequestContext();
            //app.UseSession();


            // global policy - assign here or on each controller
            app.UseCors("AllowAll");


            app.UseAuthenticateRequestMiddleware();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseIdentityServer();

            app.UseMvcWithDefaultRoute();
        }
    }
}
