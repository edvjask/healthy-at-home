using System.Text.RegularExpressions;

namespace HealthyAtHomeAPI.Helpers;

public static class TrainingPlanHelpers
{
    public static string SplitCamelCase(string input)
    {
        return Regex.Replace(input, "([A-Z])", " $1", RegexOptions.Compiled).Trim();
    }
}