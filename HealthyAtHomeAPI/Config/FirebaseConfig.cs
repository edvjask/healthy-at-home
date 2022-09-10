using System.Text.Json;
using System.Text.Json.Serialization;
using HealthyAtHomeAPI.Helpers;

namespace HealthyAtHomeAPI.Config;

public class FirebaseConfig
{
    [JsonPropertyName("type")] public string Type { get; set; }
    [JsonPropertyName("project_id")] public string ProjectId { get; set; }
    [JsonPropertyName("private_key_id")] public string PrivateKeyId { get; set; }
    [JsonPropertyName("private_key")] public string PrivateKey { get; set; }
    [JsonPropertyName("client_email")] public string ClientEmail { get; set; }
    [JsonPropertyName("client_id")] public string ClientId { get; set; }
    [JsonPropertyName("auth_uri")] public string AuthUri { get; set; }
    [JsonPropertyName("token_uri")] public string TokenUri { get; set; }

    [JsonPropertyName("auth_provider_x509_cert_url")]
    public string AuthProviderX509CertUrl { get; set; }

    [JsonPropertyName("client_x509_cert_url")]
    public string ClientX509CertUrl { get; set; }

    public FirebaseConfig()
    {
        Type = Environment.GetEnvironmentVariable("FIREBASE_TYPE");
        ProjectId = Environment.GetEnvironmentVariable("FIREBASE_PROJECT_ID");
        PrivateKeyId = Environment.GetEnvironmentVariable("FIREBASE_PRIVATE_KEY_ID");
        PrivateKey = Environment.GetEnvironmentVariable("FIREBASE_PRIVATE_KEY").RemoveQuotesAndNewlines();
        ClientEmail = Environment.GetEnvironmentVariable("FIREBASE_CLIENT_EMAIL");
        ClientId = Environment.GetEnvironmentVariable("FIREBASE_CLIENT_ID");
        AuthUri = Environment.GetEnvironmentVariable("FIREBASE_AUTH_URI");
        TokenUri = Environment.GetEnvironmentVariable("FIREBASE_TOKEN_URI");
        AuthProviderX509CertUrl = Environment.GetEnvironmentVariable("FIREBASE_AUTH_PROVIDER_X509_CERT_URL");
        ClientX509CertUrl = Environment.GetEnvironmentVariable("FIREBASE_CLIENT_X509_CERT_URL");
    }

    public string Serialize()
    {
        return JsonSerializer.Serialize(this);
    }
}