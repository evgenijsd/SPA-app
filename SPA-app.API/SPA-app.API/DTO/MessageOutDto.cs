using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

#nullable enable

namespace SPA_app.API.DTO
{
    public class MessageOutDto
    {
        public Guid Id { get; set; }

        public Guid MessageId { get; set; }

        public int Layer { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string HomePage { get; set; } = string.Empty;

        public string Text { get; set; } = string.Empty;

        public string? LoadFile { get; set; }

        public DateTime Created { get; set; }

        public string Token { get; set; } = string.Empty;
    }
}
