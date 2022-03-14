using System.ComponentModel;

namespace HealthyAtHomeAPI.Enumerators;

public enum EHeightUnits : byte
{
    [Description("cm")] Centimeters = 1,

    [Description("ft/inch")] FeetInches = 2
}