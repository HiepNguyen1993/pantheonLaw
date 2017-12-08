using System;
using System.Collections.Generic;
using System.Text;

namespace Pantheon.AppService.DTO
{
    public class ResultDto
    {
        public bool Status { get; set; }

        public string Message { get; set; }
        public object Data { get; set; }
    }
}
