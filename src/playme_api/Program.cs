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
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers
//builder.Services.AddSingleton<DapperContext>();
builder.Services.AddHealthChecks();

// Add DALs
//builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<IUsersRepository, UsersRepository>();
// Add services to the container.
builder.Services.AddControllers();
//builder.Services.AddControllers(options => options.SuppressAsyncSuffixInActionNames = false);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(config =>
{
    //use fully qualified object names
    config.CustomSchemaIds(x => x.FullName);
});



//builder.Services.AddMvc(o =>
//{
//    o.Filters.Add(new ProducesResponseTypeAttribute(typeof(User), 200));
//});

//Cors
builder.Services.AddCors(options => options.AddPolicy("Policy", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

//Linq2Db Connection
builder.Services.AddLinqToDBContext<Linq2DbContext>((provider, options) => {
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

app.UseCors("Policy");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
