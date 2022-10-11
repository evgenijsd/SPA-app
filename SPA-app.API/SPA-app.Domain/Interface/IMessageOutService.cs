﻿using SPA_app.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SPA_app.Domain.Interface
{
    public interface IMessageOutService<Tdto>
    {
        Task<List<Tdto>> GetAllAsync();

        Task<Guid> AddAsync(Tdto data);
    }
}
