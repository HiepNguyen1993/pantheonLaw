using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Pantheon.AppService.Configuration;
using Pantheon.AppService.DTO;
using Pantheon.AppService.ServiceContracts.Query;

namespace Pantheon.Api.Controllers
{
    public class AccountController : Controller
    {
        private readonly WebCoreSettings _webCoreSettings;
        private readonly IAccountQueryService _accountQueryService;

        public AccountController( IOptionsSnapshot<WebCoreSettings> options)
        {
            _webCoreSettings = options.Value;
        }


        [HttpGet("isLogin")]
        public IActionResult IsLogin()
        {
            return Ok(true);
        }

        [AllowAnonymous]
        [HttpGet("forgot-password")]
        public async System.Threading.Tasks.Task<IActionResult> ResetPasswordAsync([FromQuery] string email)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultDto result = await _accountQueryService.ForgotPassword(email, _webCoreSettings);

            return Ok(result);
        }
    }
}