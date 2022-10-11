using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPA_app.API.DTO
{
    public class MessageOutDto
    {
        public Guid Id { get; set; }

        public Guid MessageId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string HomePage { get; set; }

        public string Text { get; set; }

        public DateTime Created { get; set; }
    }
}
