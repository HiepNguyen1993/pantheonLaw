using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Pantheon.Api.TokenAuthentication
{
    public class TokenProviderMiddleware
    {
        private readonly RequestDelegate _next;
        //private readonly IAccountQueryService _accountQueryService;
        private readonly TokenProviderOptions _options;
        private readonly JsonSerializerSettings _serializerSettings;

        public TokenProviderMiddleware(
            RequestDelegate next,
            IOptions<TokenProviderOptions> options
            //, IAccountQueryService accountQueryService
            )
        {
            _next = next;
            //_accountQueryService = accountQueryService;

            _options = options.Value;
            ThrowIfInvalidOptions(_options);

            _serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };
        }

        public Task Invoke(HttpContext context)
        {
            // If the request path doesn't match, skip
            if (!context.Request.Path.Equals(_options.Path, StringComparison.Ordinal))
            {
                return _next(context);
            }

            // Request must be POST with Content-Type: application/x-www-form-urlencoded
            if (!context.Request.Method.Equals("POST")
                || !context.Request.HasFormContentType)
            {
                context.Response.StatusCode = 400;
                return context.Response.WriteAsync("Bad request.");
            }

            return GenerateToken(context);
        }

        private async Task GenerateToken(HttpContext context)
        {
            var username = context.Request.Form["username"];
            var password = context.Request.Form["password"];

            var identity = await _options.IdentityResolver(username, password);
            if (identity == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Invalid username or password.");
                return;
            }

            //var user = await _accountQueryService.GetUser(username);
            //var userProfile = JsonConvert.SerializeObject(new
            //{
            //    user.Id,
            //    user.LoginUserId,
            //    user.UserName,
            //    user.Name,
            //    user.CompanyId,
            //    user.UserRole
            //}, Formatting.None, new JsonSerializerSettings
            //{
            //    ContractResolver = new CamelCasePropertyNamesContractResolver()
            //});

            //var now = DateTime.UtcNow;

            //// Specifically add the jti (nonce), iat (issued timestamp), and sub (subject/user) claims.
            //// You can add other claims here, if you want:
            //var claims = new List<Claim>
            //{
            //    new Claim(JwtRegisteredClaimNames.Sub, username),
            //    new Claim(BravoIdentityClaims.UserName, username),
            //    new Claim(BravoIdentityClaims.LoginUserId, user.LoginUserId),
            //    //new Claim(JwtRegisteredClaimNames.Jti, await _options.NonceGenerator()),
            //    new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUniversalTime().ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
            //};

            //if (user.UserRole == UserRoles.Admin)
            //{
            //    // Add "admin" claim if user login is Administrator role
            //    claims.Add(new Claim(BravoIdentityClaims.IsAdmin, "1"));
            //}

            //// Create the JWT and write it to a string
            //var jwt = new JwtSecurityToken(
            //    issuer: _options.Issuer,
            //    audience: _options.Audience,
            //    claims: claims,
            //    notBefore: now,
            //    expires: now.Add(_options.Expiration),
            //    signingCredentials: _options.SigningCredentials);
            //var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            //// SetUserProperties
            //BravoGlobals.SetUserProperties(user.LoginUserId);

            //var response = new
            //{
            //    access_token = encodedJwt,
            //    refresh_token = encodedJwt,
            //    token_expire = DateTime.Now.AddMinutes(_options.Expiration.Minutes).ToString("R"),
            //    expires_in = (int)_options.Expiration.TotalSeconds,
            //    userProfile
            //};
            var response = new { };

            // Serialize and return the response
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonConvert.SerializeObject(response, _serializerSettings));
        }

        private static void ThrowIfInvalidOptions(TokenProviderOptions options)
        {
            if (string.IsNullOrEmpty(options.Path))
            {
                throw new ArgumentNullException(nameof(TokenProviderOptions.Path));
            }

            if (string.IsNullOrEmpty(options.Issuer))
            {
                throw new ArgumentNullException(nameof(TokenProviderOptions.Issuer));
            }

            if (string.IsNullOrEmpty(options.Audience))
            {
                throw new ArgumentNullException(nameof(TokenProviderOptions.Audience));
            }

            if (options.Expiration == TimeSpan.Zero)
            {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(TokenProviderOptions.Expiration));
            }

            if (options.IdentityResolver == null)
            {
                throw new ArgumentNullException(nameof(TokenProviderOptions.IdentityResolver));
            }

            if (options.SigningCredentials == null)
            {
                throw new ArgumentNullException(nameof(TokenProviderOptions.SigningCredentials));
            }

            //            if (options.NonceGenerator == null)
            //            {
            //                throw new ArgumentNullException(nameof(TokenProviderOptions.NonceGenerator));
            //            }
        }
    }
}
