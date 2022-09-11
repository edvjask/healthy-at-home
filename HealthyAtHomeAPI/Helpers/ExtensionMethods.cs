using System.Text;

namespace HealthyAtHomeAPI.Helpers;

public static class ExtensionMethods
{
    public static string EncodeBase64(this string value)
    {
        var valueBytes = Encoding.UTF8.GetBytes(value);
        return Convert.ToBase64String(valueBytes);
    }

    public static string DecodeBase64(this string value)
    {
        var valueBytes = Convert.FromBase64String(value);
        return Encoding.UTF8.GetString(valueBytes);
    }

    public static string RemoveQuotesAndNewlines(this string value)
    {
        if (string.IsNullOrEmpty(value)) return "";
        var removeQuotes = value.Trim('"');
        return removeQuotes.Replace("\\n", "\n");
    }
}