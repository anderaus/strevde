﻿using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Strava.DotNet;
using Strevde.API.Services;
using System.Net;
using System.Threading.Tasks;

namespace Strevde.API
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
            services.AddAuthentication(options =>
                {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                })
                .AddCookie(options =>
                {
                    options.Cookie.SameSite = SameSiteMode.None;
                    options.Events = new CookieAuthenticationEvents
                    {
                        OnRedirectToLogin = ctx =>
                        {
                            ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                            return Task.CompletedTask;
                        }
                    };
                })
                .AddStrava(options =>
                {
                    options.ClientId = Configuration.GetValue<string>("appSettings:stravaClientId");
                    options.ClientSecret = Configuration.GetValue<string>("appSettings:stravaClientSecret");
                    options.SaveTokens = true;
                    options.Events = new OAuthEvents
                    {
                        OnRedirectToAuthorizationEndpoint = async ctx =>
                        {
                            ctx.Response.StatusCode = (int)HttpStatusCode.OK;
                            await ctx.Response.WriteAsync(
                                JsonConvert.SerializeObject(
                                    new { accessUrl = ctx.RedirectUri.ToString() }));
                        }
                    };
                });

            services.AddSingleton<StravaClient>();
            services.AddSingleton<ITripConverter, TripConverter>();
            services.AddSingleton<ITripStorage, TripStorage>(
                provider =>
                    new TripStorage(
                        Configuration.GetValue<string>("appSettings:cosmosDbEndpointUri"),
                        Configuration.GetValue<string>("appSettings:cosmosDbAuthKey")));

            services
                .AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.Converters.Add(new StringEnumConverter());
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddAutoMapper();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseCors(policy => policy
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin()
                .AllowCredentials());

            app.UseMvc();
        }
    }
}