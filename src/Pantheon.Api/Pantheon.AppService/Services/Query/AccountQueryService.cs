using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pantheon.AppService.Configuration;
using Pantheon.AppService.DTO;
using Pantheon.AppService.ServiceContracts.Query;

namespace Pantheon.AppService.Services.Query
{
    public class AccountQueryService : IAccountQueryService
    {
        public Task<bool> ValidateUser(string username, string password)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityUserDto> GetUser(string username)
        {
            throw new NotImplementedException();
        }

        public Task<ResultDto> ForgotPassword(string email, WebCoreSettings bravosetting)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetUserNameByEmail(string email)
        {
            throw new NotImplementedException();
        }
    }
}
