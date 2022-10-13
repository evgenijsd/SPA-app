using SPA_app.Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SPA_app.Domain.Interface
{
    public interface IMessageOutService<Tdto>
    {
        Task<List<Tdto>> GetAllAsync(PageParameters pageParameters);

        Task<List<Tdto>> GetByIdAsync(Guid id, PageParameters pageParameters);

        Task<Guid> AddAsync(Tdto data);
    }
}
