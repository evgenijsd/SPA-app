using SPA_app.Domain.Interface;
using SPA_app.Domain.Service.Interface;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SPA_app.Domain.Service.Generic
{
    public class GenericService<T, Tdto> : IGenericService<T, Tdto> where T : class where Tdto : class
    {
        protected IUnitOfWork _unitOfWork;
        protected IGenericRepository<T> _repository;

        public GenericService(IUnitOfWork unitOfWork)
        {
            if (_unitOfWork == null)
                _unitOfWork = unitOfWork;
            _repository = _unitOfWork.GetRepository<T>();
        }

        public virtual async Task<T> AddAsync(Tdto data)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Tdto, T>());
            var mapper = new Mapper(config);
            T t = mapper.Map<Tdto, T>(data);            

            if (t != null) _repository.Add(t);
            await _unitOfWork.CompleteAsync();
            return t;
        }

        public virtual async Task<int> DeleteAsync(Guid id)
        {
            T t = await _repository.GetByIdAsync(id);

            if (t != null) _repository.Remove(t);
            return await _unitOfWork.CompleteAsync();
        }

        public virtual async Task<List<Tdto>> GetAsync(Expression<Func<T, bool>> expression)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<T, Tdto>());
            var mapper = new Mapper(config);

            return mapper.Map<List<T>, List<Tdto>>(await _repository.FindAsync(expression));
        }

        public virtual async Task<Tdto> GetOneAsync(Expression<Func<T, bool>> expression)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<T, Tdto>());
            var mapper = new Mapper(config);

            return mapper.Map<T, Tdto>(await _repository.AnyAsync(expression));
        }

        public virtual async Task<List<Tdto>> GetAllAsync()
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<T, Tdto>());
            var mapper = new Mapper(config);
            return mapper.Map<List<T>, List<Tdto>>(await _repository.GetAllAsync());
        }

        public virtual async Task<Tdto> GetByIdAsync(Guid id)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<T, Tdto>());
            var mapper = new Mapper(config);
            return mapper.Map<T, Tdto>(await _repository.GetByIdAsync(id));
        }

        public virtual async Task<bool> GetByValidIdAsync(Guid id)
        {
            return (await _repository.GetByIdAsync(id) != null);
        }

        public virtual async Task<T> UpdateAsync(Tdto data, Guid id)
        {
            T t = await _repository.GetByIdAsync(id);
            if (t != null)
            {
                var config = new MapperConfiguration(cfg => cfg.CreateMap<Tdto, T>());
                var mapper = new Mapper(config);
                t = mapper.Map<Tdto, T>(data, t);

                await _unitOfWork.CompleteAsync();
            }
            return t;
        }
    }
}
