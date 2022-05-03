using System.Text.Json.Serialization;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using HealthyAtHomeAPI.Interfaces;
using HealthyAtHomeAPI.Middlewares;
using HealthyAtHomeAPI.Persistence.Contexts;
using HealthyAtHomeAPI.Persistence.Repositories;
using HealthyAtHomeAPI.Repository;
using HealthyAtHomeAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


//Add AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Add database config
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Add services to the container.
builder.Services.AddScoped<ITrainingPlanService, TrainingPlanService>();
builder.Services.AddScoped<ITrainingPlanRepository, TrainingPlanRepository>();
builder.Services.AddScoped<IExerciseRepository, ExerciseRepository>();
builder.Services.AddScoped<IExerciseService, ExerciseService>();
builder.Services.AddScoped<IWorkoutProgramService, WorkoutProgramService>();
builder.Services.AddScoped<IWorkoutRepository, WorkoutRepository>();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddHttpContextAccessor();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
        });
});

//Configure Firebase auth
// var cur = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
// var dir = @"..\..\..\..\";
// var fileLocation = @".secrets\healthyathome-service-key.json";
// var newPath = Path.GetFullPath(Path.Combine(cur, dir));
var pathToKey = Path.Combine(Directory.GetCurrentDirectory(), ".secrets", "healthyathome-service-key.json");
//var location = @"D:\Projects\Bakalaurinis\HealthyAtHomeAPI\.secrets\healthyathome-service-key.json";

FirebaseApp.Create(new AppOptions
{
    Credential =
        GoogleCredential.FromFile(pathToKey)
});

var claims = new Dictionary<string, object>
{
    {"admin", true}
};
const string adminUid = "kLnRV9UqUsWYA8QDJuefu4pqLiF3";
await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(adminUid, claims);

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

//cors
app.UseCors();

app.UseRouting();

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseStaticFiles();

app.MapControllers();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.Run();