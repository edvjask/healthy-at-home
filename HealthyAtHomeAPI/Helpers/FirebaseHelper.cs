using FirebaseAdmin.Auth;

namespace HealthyAtHomeAPI.Helpers;

public class FirebaseHelper
{
    public static async Task<bool> IsUserAdmin(string? token)
    {
        if (token is null || token is null || token.Length == 0) return false;

        var decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
        object isAdmin;
        if (decoded.Claims.TryGetValue("admin", out isAdmin))
            if ((bool) isAdmin)
                return true;

        return false;
    }
}