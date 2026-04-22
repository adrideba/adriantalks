using AdrianTalksCore.Data;
using AdrianTalksCore.Infrastructure.Interface;
using AdrianTalksCore.Infrastructure.Service;
using Microsoft.EntityFrameworkCore;

namespace AdrianTalksCore
{
    public class Startup
    {
        private readonly IConfiguration _config;
        private const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            string[] urls = ["http://localhost:4200", "https://adriantalks.azurewebsites.net"];

            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                                      builder =>
                                      {
                                          builder.AllowAnyHeader().AllowAnyMethod().WithOrigins(urls);
                                      });
            });

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(_config.GetConnectionString("DefaultConnection")));

            services.AddControllers();

            services.AddTransient<IBlogRepository, BlogRepository>();
            services.AddTransient<ICategoryRepository, CategoryRepository>();

            services.AddMemoryCache();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (!env.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
