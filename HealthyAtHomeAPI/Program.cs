using System.Text.Json.Serialization;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using HealthyAtHomeAPI.Config;
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
var env = builder.Environment;

//Add AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Add database config
var connString = env.IsDevelopment()
    ? builder.Configuration.GetConnectionString("PostgreConnection")
    : DbConfig.GetConnectionString();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connString));


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
        optionsBuilder =>
        {
            if (env.IsDevelopment())
                optionsBuilder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
        }
    );
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

//Firebase config
var pathToKey = Path.Combine(Directory.GetCurrentDirectory(),
    ".secrets", "healthyathome-service-key.json");

var firebaseConfig = new FirebaseConfig();
FirebaseApp.Create(new AppOptions
{
    Credential = app.Environment.IsDevelopment()
        ? GoogleCredential.FromFile(pathToKey)
        : GoogleCredential.FromJson(firebaseConfig.Serialize())
});

var claims = new Dictionary<string, object>
{
    {"admin", true}
};
const string adminUid = "kLnRV9UqUsWYA8QDJuefu4pqLiF3";
await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(adminUid, claims);
await FirebaseAuth.DefaultInstance.UpdateUserAsync(new UserRecordArgs
{
    Uid = adminUid,
    EmailVerified = true
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// migrate any database changes on startup (includes initial db creation)
using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dataContext.Database.Migrate();
}

//cors
app.UseCors();

app.UseRouting();

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseStaticFiles();

app.MapControllers();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapFallbackToController("Index", "Fallback");
});

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.Run();