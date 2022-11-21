using playme_api.Helper;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers
builder.Services.AddSingleton<DapperContext>();
builder.Services.AddHealthChecks();

// Add DALs
//builder.Services.AddScoped<IUsersRepository, UsersRepository>();

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config =>
{
    //use fully qualified object names
    config.CustomSchemaIds(x => x.FullName);
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
