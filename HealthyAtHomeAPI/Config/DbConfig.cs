namespace HealthyAtHomeAPI.Config;

public static class DbConfig
{
    private static readonly string _host = Environment.GetEnvironmentVariable("DB_HOST");
    private static readonly string _user = Environment.GetEnvironmentVariable("DB_USER");
    private static readonly string _dBname = Environment.GetEnvironmentVariable("DB_NAME");
    private static readonly string _password = Environment.GetEnvironmentVariable("DB_PASSWORD");
    private static readonly string _port = Environment.GetEnvironmentVariable("DB_PORT");

    public static string GetConnectionString()
    {
        var connString = string.Format(
            "Server={0};Database={1};Port={2};User Id={3};Password={4};Ssl Mode=VerifyFull;",
            _host,
            _dBname,
            _port,
            _user,
            _password);

        return connString;
    }
}