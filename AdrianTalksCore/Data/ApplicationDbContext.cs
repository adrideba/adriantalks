using AdrianTalksCore.Models;
using Microsoft.EntityFrameworkCore;

namespace AdrianTalksCore.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Blog> Blog { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<BlogViewCount> BlogViewCount { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            options.UseSqlServer(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
