using System;
using System.Collections.Generic;
using System.Text;

namespace Pantheon.AppService.DTO
{
    public class IdentityUserDto
    {
        public string Id
        {
            get => UserName;
            set => UserName = value;
        }

        public string CompanyId { get; set; }

        public string UserName { get; set; }

        public string Name { get; set; }

        public string Password { get; set; }

        public decimal UserRole { get; set; }

        public decimal CustomerId { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string LoginUserId { get; set; }
    }
}
