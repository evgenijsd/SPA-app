using System;
using System.Threading.Tasks;

namespace SPA_app.Domain.Interface
{
    public interface IUnitOfWork : IAsyncDisposable
    {
        IGenericRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
        Task<int> CompleteAsync();
    }
}
