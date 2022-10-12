using SPA_app.DataAccess.Repositories;
using SPA_app.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SPA_app.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ConnectionBaseContext _context;
        private Dictionary<Type, object> _repositories;
        public ConnectionBaseContext Context { get => _context; }

        public UnitOfWork(ConnectionBaseContext context)
        {
            _context = context;
        }

        public IGenericRepository<T> GetRepository<T>() where T : class
        {
            if (_repositories == null) _repositories = new Dictionary<Type, object>();
            var type = typeof(T);
            if (!_repositories.ContainsKey(type)) _repositories[type] = new GenericRepository<T>(Context);
            return (IGenericRepository<T>)_repositories[type];
        }

        public async Task<int> CompleteAsync()
        {
            return await Context.SaveChangesAsync();
        }

        public async ValueTask DisposeAsync()
        {
            await Context.DisposeAsync();
        }
    }
}
