using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IkKoopMijnEnergieAPI.Model;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace IkKoopMijnEnergieAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            var server = Configuration["DBServer"] ?? "192.168.0.170";
            var port = Configuration["DBPort"] ?? "1433";
            var user = Configuration["DBUser"] ?? "sa";
            var password = Configuration["DBPassword"] ?? "Pa$$w0rd2020";
            var database = Configuration["Database"] ?? "TestDB";

            services.AddDbContext<IkmeDbContext>(
                options => options.UseSqlServer($"Server={server},{port};Initial Catalog={database};User ID={user};Password={password}"));

            //services.AddDbContext<IkmeDbContext>(
            //    options => options.UseSqlServer(
            //        Configuration.GetConnectionString("LocalConnection")));

            services.AddCors(options =>
            {   
                options.AddPolicy("AllowMyOrigin",
                builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });

            services.AddMvc();

            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("AllowMyOrigin"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IkmeDbContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors("AllowMyOrigin");
            app.UseMvc();
            DatabaseInitializer.Intialize(context);
        }   
    }
}
