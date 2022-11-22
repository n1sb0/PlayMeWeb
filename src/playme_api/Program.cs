using LinqToDB.AspNet.Logging;
using LinqToDB.Common;
using LinqToDB.Configuration;
using LinqToDB.AspNet;
using playme_api.Helper;
using LinqToDB;
using System;
using playme_api.Models;
using playme_api.Interfaces;
using playme_api.Models.DAL;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers
//builder.Services.AddSingleton<DapperContext>();
builder.Services.AddHealthChecks();

// Add DALs
//builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<IUsersRepository, UsersRepository>();
// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(config =>
{
    //use fully qualified object names
    config.CustomSchemaIds(x => x.FullName);
});


//Linq2Db Connection
builder.Services.AddLinqToDBContext<AppDataConnection>((provider, options) => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlConnection")).UseDefaultLogging(provider);
});

var app = builder.Build();

//Check app health
app.UseHealthChecks("/healthcheck");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
