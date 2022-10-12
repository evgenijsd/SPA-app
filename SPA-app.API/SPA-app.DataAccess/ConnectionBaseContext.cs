using SPA_app.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace SPA_app.DataAccess
{
    public partial class ConnectionBaseContext : DbContext
    {
        public ConnectionBaseContext()
        {            
        }

        public ConnectionBaseContext(DbContextOptions<ConnectionBaseContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
