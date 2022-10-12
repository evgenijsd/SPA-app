using System;
using System.Collections.Generic;
using System.Text;

namespace SPA_app.API.DTO
{
    public class MessageDto
    {
        public Guid Id { get; set; }

        public Guid? MessageId { get; set; }

        public Guid UserId { get; set; }

        public string Text { get; set; }

        public DateTime Created { get; set; }
    }
}
