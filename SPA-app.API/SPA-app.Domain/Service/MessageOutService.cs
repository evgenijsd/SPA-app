using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SPA_app.Domain.Entities;
using SPA_app.Domain.Enums;
using SPA_app.Domain.Extensions;
using SPA_app.Domain.Helpers;
using SPA_app.Domain.Interface;
using SPA_app.Domain.Models;
using System;
using System.Collections;
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

        public async Task<PagedList<Tdto>> GetAllAsync(PageParameters pageParameters)
        {
            var messages = await Messages.GetAllAsync(y => y.MessageId == Guid.Empty, x => x.Include(x => x.UserNavigation));
            var messagesOut = new List<MessageOut>();

            Func<MessageOut, object> sortingSelector = pageParameters.SortingType switch
            {
                ESortingMessagesType.ByName => x => x.Name,
                ESortingMessagesType.ByEmail => x => x.Email,
                ESortingMessagesType.ByDate => x => x.Created,
                _ => x => x.Created,
            };

            if (Sort.SortingType == ESortingMessagesType.None || Sort.SortingType != pageParameters.SortingType) 
            {
                messagesOut = messages.Select(x => x.ToOut()).OrderBy(sortingSelector).ToList();
                Sort.SortingType = pageParameters.SortingType;
            }
            else
            {
                messagesOut = messages.Select(x => x.ToOut()).OrderByDescending(sortingSelector).ToList();
                Sort.SortingType = ESortingMessagesType.None;
            }

            int count = messagesOut.Count();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<MessageOut, Tdto>());
            var mapper = new Mapper(config);

            return PagedList<Tdto>.ToPagedList(
                mapper.Map<IEnumerable<MessageOut>, List<Tdto>>(
                    messagesOut
                        .Skip((pageParameters.PageNumber - 1) * pageParameters.PageSize)
                        .Take(pageParameters.PageSize)
                ),
                pageParameters.PageNumber,
                pageParameters.PageSize,
                count
            );
        }

        public async Task<PagedList<Tdto>> GetByIdAsync(Guid id, PageParameters pageParameters)
        {
            var messages = await Messages.GetAsync(y => y.Id == id, x => x.Include(x => x.UserNavigation));
            var messagesOut = messages.Select(x => x.ToOut()).ToList();
            
            await LoadLayers(id, 0, messagesOut);
            int count = messagesOut.Count();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<MessageOut, Tdto>());
            var mapper = new Mapper(config);

            return PagedList<Tdto>.ToPagedList(
                mapper.Map<IEnumerable<MessageOut>, List<Tdto>>(
                    messagesOut
                        .Skip((pageParameters.PageNumber - 1) * pageParameters.PageSize)
                        .Take(pageParameters.PageSize)
                ),
                pageParameters.PageNumber,
                pageParameters.PageSize,
                count
            );
        }

        public async Task<Guid> AddAsync(Tdto data)
        {                        
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Tdto, MessageOut>());
            var mapper = new Mapper(config);
            var messageOut = mapper.Map<Tdto, MessageOut>(data);
            var message = new Message();

            if (messageOut != null)
            {
                messageOut.Id = Guid.Empty;
                messageOut.Created = DateTime.Now;

                message = messageOut.ToMessage();
                var user = await Users.GetOneAsync(x => x.Name == messageOut.Name);

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

        private async Task LoadLayers(Guid id, int layer, List<MessageOut> messagesOut)
        {
            layer++;
            var messages = await Messages.GetAsync(y => y.MessageId == id, x => x.Include(x => x.UserNavigation));

            if (messages != null)
            {
                var messagesAdd = messages.Select(x => x.ToOut(layer)).OrderBy(x => x.Created);                           

                foreach (var message in messagesAdd)
                {
                    messagesOut.Add(message);
                    await LoadLayers(message.Id, layer, messagesOut);
                }
            }
        }
    }
}
