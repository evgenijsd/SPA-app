using System;
using System.Collections.Generic;
using System.Text;

#nullable enable

namespace SPA_app.API.DTO
{
    public class MessageDto
    {
        public Guid Id { get; set; }

        public Guid? MessageId { get; set; }

        public Guid UserId { get; set; }

        public string Text { get; set; } = string.Empty;

        public string? LoadFile { get; set; }

        public DateTime Created { get; set; }
    }
}
