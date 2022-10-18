using System;

#nullable enable

namespace SPA_app.Domain.Entities
{
    public class Message
    {
        public Guid Id { get; set; }

        public Guid MessageId { get; set; }

        public Guid UserId { get; set; }

        public string Text { get; set; } = string.Empty;

        public DateTime Created { get; set; }

        public string? LoadFile { get; set; }


        public virtual User? UserNavigation { get; set; }
    }
}
