using SPA_app.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SPA_app.Domain.Extensions
{
    public static class MessageExtension
    {
        public static User ToUser(this MessageOut message)
        {
            return new User()
            {
                Id = message.Id,
                Name = message.Name,
                Email = message.Email,
                HomePage = message.HomePage,
                Created = message.Created
            };
        }
        public static Message ToMessage(this MessageOut message)
        {
            return new Message()
            {
                Id = message.Id,
                MessageId = message.MessageId,
                UserId = Guid.Empty,
                Text = message.Text,
                Created = message.Created,
            };
        }

        public static MessageOut ToOut(this Message message)
        {
            return new MessageOut()
            {
                Id = message.Id,
                Name = message.UserNavigation.Name,
                Email = message.UserNavigation.Email,
                HomePage = message.UserNavigation.HomePage,
                MessageId = message.MessageId,
                Text = message.Text,
                Created = message.Created,
            };
        }
    }
}
