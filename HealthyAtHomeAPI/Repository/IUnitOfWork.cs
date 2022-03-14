namespace HealthyAtHomeAPI.Repository;

public interface IUnitOfWork
{
    Task CompleteAsync();
}