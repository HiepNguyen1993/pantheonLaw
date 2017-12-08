using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pantheon.AppService.Configuration;
using Pantheon.AppService.DTO;

namespace Pantheon.AppService.ServiceContracts.Query
{
    public interface IAccountQueryService
    {
        Task<bool> ValidateUser(string username, string password);
        Task<IdentityUserDto> GetUser(string username);
        Task<ResultDto> ForgotPassword(string email, WebCoreSettings bravosetting);
        Task<string> GetUserNameByEmail(string email);
    }
}
