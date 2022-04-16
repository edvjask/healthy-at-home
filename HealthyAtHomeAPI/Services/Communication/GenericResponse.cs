namespace HealthyAtHomeAPI.Services.Communication;

public class GenericResponse<T>
{
    public T Data { get; set; }
    public bool Success { get; set; } = true;
    public string? Message { get; set; }

    public GenericResponse(T data, bool success, string message)
    {
        Data = data;
        Success = success;
        Message = message;
    }

    public GenericResponse()
    {
    }

    public static GenericResponse<T> SuccessResponse(T data)
    {
        return new GenericResponse<T>(data, true, null);
    }

    public static GenericResponse<T> ErrorResponse(string message)
    {
        return new GenericResponse<T>(default, false, message);
    }

}