using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using SPA_app.API.Validators;
using SPA_app.DataAccess;
using SPA_app.Domain.Interface;
using SPA_app.Domain.Service;
using SPA_app.Domain.Service.Generic;
using SPA_app.Domain.Service.Interface;

namespace SPA_app.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        [System.Obsolete]
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            //.AddFluentValidation(fvc => 
            //    fvc.RegisterValidatorsFromAssemblyContaining<MessageOutValidator>()
            //);
            services.AddCors();

            services.AddDbContext<ConnectionBaseContext>(options =>
                options
                    .UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly(typeof(ConnectionBaseContext).Assembly.FullName)));

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddTransient(typeof(IGenericService<,>), typeof(GenericService<,>));
            services.AddTransient(typeof(IMessageOutService<>), typeof(MessageOutService<>));

            services.AddValidatorsFromAssemblyContaining<MessageOutValidator>();
            ValidatorOptions.Global.LanguageManager.Enabled = false;

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SpaBase.API", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SpaBase.API v1"));
            }

            app.UseRouting();

            app.UseCors(builder => builder.AllowAnyHeader().AllowAnyOrigin());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
