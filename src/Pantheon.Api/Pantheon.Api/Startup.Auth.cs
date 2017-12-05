using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Pantheon.Api.TokenAuthentication;

namespace Pantheon.Api
{
    public partial class Startup
    {
        private IApplicationBuilder _appBuilder;
        private void ConfigureAuth(IApplicationBuilder app, IServiceCollection services, TokenAuthSettings tokenSettings)
        {
            _appBuilder = app;
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(tokenSettings.SecretKey));
            var tokenProviderOptions = new TokenProviderOptions
            {
                Path = tokenSettings.TokenPath,
                Audience = tokenSettings.Audience,
                Issuer = tokenSettings.Issuer,
                Expiration = TimeSpan.FromHours(tokenSettings.Expiration),
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
                IdentityResolver = GetIdentity
            };

            var tokenValidationParameters = new TokenValidationParameters
            {
                // The signing key must match!
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,
                // Validate the JWT Issuer (iss) claim
                ValidateIssuer = true,
                ValidIssuer = tokenSettings.Issuer,
                // Validate the JWT Audience (aud) claim
                ValidateAudience = true,
                ValidAudience = tokenSettings.Audience,
                // Validate the token expiry
                ValidateLifetime = true,
                // If you want to allow a certain amount of clock drift, set that here:
                ClockSkew = TimeSpan.Zero
            };


            //app.UseJwtBearerAuthentication(new JwtBearerOptions
            //{
            //    AutomaticAuthenticate = true,
            //    AutomaticChallenge = true,
            //    TokenValidationParameters = tokenValidationParameters
            //});

            //app.UseCookieAuthentication(new CookieAuthenticationOptions
            //{
            //    AutomaticAuthenticate = true,
            //    AutomaticChallenge = true,
            //    AuthenticationScheme = "Cookie",
            //    CookieName = tokenSettings.CookieName,
            //    TicketDataFormat = new CustomJwtDataFormat(
            //        SecurityAlgorithms.HmacSha256,
            //        tokenValidationParameters),
            //    Events = new CookieAuthenticationEvents
            //    {
            //        OnRedirectToLogin = context =>
            //        {
            //            if (context.Request.Path.StartsWithSegments("/api") && context.Response.StatusCode == (int)HttpStatusCode.OK)
            //                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            //            else
            //                context.Response.Redirect(context.RedirectUri);
            //            return Task.FromResult(0);
            //        },

            //        OnRedirectToAccessDenied = context =>
            //        {
            //            if (context.Request.Path.StartsWithSegments("/api") && context.Response.StatusCode == (int)HttpStatusCode.OK)
            //                context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
            //            else
            //                context.Response.Redirect(context.RedirectUri);
            //            return Task.FromResult(0);
            //        }
            //    },
            //});

            app.UseAuthentication();

            services.AddAuthentication(options =>
                {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                })
                .AddCookie().AddOpenIdConnect(options =>
                {
                    options.Authority = Configuration["auth:oidc:authority"];
                    options.ClientId = Configuration["auth:oidc:clientid"];
                });

            app.UseMiddleware<TokenProviderMiddleware>(Options.Create(tokenProviderOptions));
        }

        private async Task<ClaimsIdentity> GetIdentity(string username, string password)
        {
            //var accountService = _appBuilder.ApplicationServices.GetRequiredService<IAccountQueryService>();
            //var isValidUser = await accountService.ValidateUser(username, password);
            //if (isValidUser)
            //{
            //    return await Task.FromResult(new ClaimsIdentity(new GenericIdentity(username, "Token"), new Claim[] { }));
            //}

            // Account doesn't exists
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}
