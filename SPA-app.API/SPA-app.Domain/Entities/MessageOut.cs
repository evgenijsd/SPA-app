using System;

#nullable enable

namespace SPA_app.Domain.Entities
{
    public class MessageOut
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
    }
}
