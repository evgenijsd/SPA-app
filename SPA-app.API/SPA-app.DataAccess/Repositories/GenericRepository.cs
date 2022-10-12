using SPA_app.Domain.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SPA_app.DataAccess.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly ConnectionBaseContext _context;
        protected readonly DbSet<T> _entities;

        public GenericRepository(ConnectionBaseContext context)
        {
            _context = context;
            _entities = context.Set<T>();
        }

        public virtual Task<List<T>> GetAsync(Expression<Func<T, bool>> expression,
                                              Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            IQueryable<T> query = _entities.Where(expression);

            if (include != null)
            {
                query = include(query);
            }

            return query.ToListAsync();
        }

        public virtual Task<T> GetOneAsync(Expression<Func<T, bool>> expression,
                                      Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            IQueryable<T> query = _entities.Where(expression);

            if (include != null)
            {
                query = include(query);
            }

            return query.FirstOrDefaultAsync();
        }

        public virtual Task<List<T>> GetAllAsync(Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            IQueryable<T> query = _entities;

            if (include != null)
            {
                query = include(query);
            }

            return query.ToListAsync();
        }

        public void Add(T entity)
        {
            _entities.Add(entity);
        }

        public void AddRange(List<T> entities)
        {
            _entities.AddRange(entities);
        }

        public async Task<List<T>> FindAsync(Expression<Func<T, bool>> expression)
        {
            return await _entities.Where(expression).ToListAsync();
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _entities.FindAsync(id);
        }

        public async Task<T> AnyAsync(Expression<Func<T, bool>> expression)
        {
            return await _entities.FirstOrDefaultAsync(expression);
        }

        public void Remove(T entity)
        {
            _entities.Remove(entity);
        }

        public void RemoveRange(List<T> entities)
        {
            _entities.RemoveRange(entities);
        }

        public void Update(T entity)
        {
            _entities.Update(entity);
        }
    }
}
