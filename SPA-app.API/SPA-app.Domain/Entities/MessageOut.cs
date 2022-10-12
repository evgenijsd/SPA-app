using System;

namespace SPA_app.Domain.Entities
{
    public class MessageOut
    {
        public Guid Id { get; set; }

        public Guid MessageId { get; set; }

        public int Layer { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string HomePage { get; set; }

        public string Text { get; set; }

        public DateTime Created { get; set; }
    }
}
