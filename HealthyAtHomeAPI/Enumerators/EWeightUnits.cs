using System.ComponentModel;

namespace HealthyAtHomeAPI.Enumerators;

public enum EWeightUnits : byte
{
    [Description("kg")] Kilograms = 1,

    [Description("lbs")] Pounds = 2
}