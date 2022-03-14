using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using HealthyAtHomeAPI.Interfaces;
using HealthyAtHomeAPI.Persistence.Contexts;
using HealthyAtHomeAPI.Repository;
using HealthyAtHomeAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

//Add database config
builder.Services.AddDbContext<AppDbContext>(options => { options.UseInMemoryDatabase("healthy-at-home-api"); });

// Add services to the container.
builder.Services.AddScoped<ITrainingPlanService, TrainingPlanService>();
builder.Services.AddScoped<ITrainingPlanRepository, TrainingPlanRepository>();

builder.Services.AddControllers();


//Configure Firebase auth

FirebaseApp.Create(new AppOptions
{
    Credential =
        GoogleCredential.FromFile(@"D:\Projects\Bakalaurinis\HealthyAtHomeAPI\.secrets\healthyathome-service-key.json")
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Jwt:Firebase:ValidIssuer"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Firebase:ValidIssuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Firebase:ValidAudience"],
            ValidateLifetime = true
        };
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();