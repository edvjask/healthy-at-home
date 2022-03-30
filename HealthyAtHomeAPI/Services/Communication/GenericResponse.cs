namespace HealthyAtHomeAPI.Services.Communication;

public class GenericResponse<T>
{
    public T Data { get; set; }
    public bool Success { get; set; } = true;
    public string Message { get; set; }
}