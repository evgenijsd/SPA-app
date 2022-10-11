using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SPA_app.Domain.Service.Interface
{
    public interface IGenericService<T, Tdto>
    {
        public Task<List<Tdto>> GetAllAsync();

        public Task<Tdto> GetByIdAsync(Guid id);
        public Task<bool> GetByValidIdAsync(Guid id);

        public Task<T> AddAsync(Tdto data);

        public Task<T> UpdateAsync(Tdto data, Guid id);

        public Task<int> DeleteAsync(Guid id);

        public Task<List<Tdto>> GetAsync(Expression<Func<T, bool>> predicate);
        public Task<Tdto> GetOneAsync(Expression<Func<T, bool>> predicate);
    }
}
