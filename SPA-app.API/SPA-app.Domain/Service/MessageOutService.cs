﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SPA_app.Domain.Entities;
using SPA_app.Domain.Extensions;
using SPA_app.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPA_app.Domain.Service
{
    public class MessageOutService<Tdto> : IMessageOutService<Tdto>
    {
        private IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<User> _users;
        private readonly IGenericRepository<Message> _messages;
        public IGenericRepository<User> Users { get => _users; }
        public IGenericRepository<Message> Messages { get => _messages; }

        public MessageOutService(IUnitOfWork unitOfWork)
        {
            if (_unitOfWork == null)
                _unitOfWork = unitOfWork;
            _users = _unitOfWork.GetRepository<User>();
            _messages = _unitOfWork.GetRepository<Message>();
        }
        public async Task<List<Tdto>> GetAllAsync()
        {
            var messages = await Messages.GetAllAsync(x => x.Include(x => x.UserNavigation));
            var messagesOut = messages.Select(x => x.ToOut());           

            var config = new MapperConfiguration(cfg => cfg.CreateMap<MessageOut, Tdto>());
            var mapper = new Mapper(config);
            return mapper.Map<IEnumerable<MessageOut> , List<Tdto>>(messagesOut);
        }

        public async Task<Guid> AddAsync(Tdto data)
        {                        
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Tdto, MessageOut>());
            var mapper = new Mapper(config);
            var messageOut = mapper.Map<Tdto, MessageOut>(data);
            var message = new Message();

            if (messageOut != null)
            {
                message = messageOut.ToMessage();
                var user = await Users.GetAsync(x => x.Name == messageOut.Name && x.Email == messageOut.Email);

                if (user != null)
                {
                    message.UserId = user.Id;
                }
                else
                {
                    user = messageOut.ToUser();
                    Users.Add(user);
                    await _unitOfWork.CompleteAsync();
                    message.UserId = user.Id;
                }

                if (message != null) Messages.Add(message);

                await _unitOfWork.CompleteAsync();
            }
            
            return message.Id;
        }
    }
}
