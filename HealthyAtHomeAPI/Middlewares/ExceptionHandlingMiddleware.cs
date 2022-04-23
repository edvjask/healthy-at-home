using System.Net;
using System.Text.Json;
using FirebaseAdmin.Auth;
using HealthyAtHomeAPI.Services.Communication;

namespace HealthyAtHomeAPI.Middlewares;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(httpContext, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        var response = context.Response;

        var errorResponse = new GenericResponse<string>
        {
            Data = null,
            Success = false
        };
        switch (exception)
        {
            case FirebaseAuthException ex:
                response.StatusCode = (int) HttpStatusCode.Unauthorized;
                errorResponse.Message = "Failed to verify Firebase token";
                break;

            case ApplicationException ex:
                if (ex.Message.Contains("Invalid token"))
                {
                    response.StatusCode = (int) HttpStatusCode.Forbidden;
                    errorResponse.Message = ex.Message;
                    break;
                }

                response.StatusCode = (int) HttpStatusCode.BadRequest;
                errorResponse.Message = ex.Message;
                break;
            case KeyNotFoundException ex:
                response.StatusCode = (int) HttpStatusCode.NotFound;
                errorResponse.Message = ex.Message;
                break;
            default:
                response.StatusCode = (int) HttpStatusCode.InternalServerError;
                errorResponse.Message = "Internal Server Error occurred";
                break;
        }

        _logger.LogError(exception.Message);
        var serializeOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
        var result = JsonSerializer.Serialize(errorResponse, serializeOptions);
        await context.Response.WriteAsync(result);
    }
}