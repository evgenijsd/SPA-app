using Microsoft.EntityFrameworkCore.Query;
using SPA_app.Domain.Helpers;
using SPA_app.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SPA_app.Domain.Interface
{
    public interface IGenericRepository<T> where T : class
    {
        Task<List<T>> GetAllAsync(
            Expression<Func<T, bool>> expression, 
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null
        );

        Task<List<T>> GetAllAsync(Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null);

        Task<List<T>> GetAsync(Expression<Func<T, bool>> expression,
                                              Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null);
        Task<T> GetOneAsync(Expression<Func<T, bool>> expression,
                                              Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null);
        Task<T> GetByIdAsync(Guid id);        
        Task<List<T>> FindAsync(Expression<Func<T, bool>> expression);
        Task<T> AnyAsync(Expression<Func<T, bool>> expression);
        void Add(T entity);
        void AddRange(List<T> entities);
        void Remove(T entity);
        void RemoveRange(List<T> entities);
        void Update(T entity);
    }
}
