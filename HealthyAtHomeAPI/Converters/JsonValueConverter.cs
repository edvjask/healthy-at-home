﻿using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;

namespace HealthyAtHomeAPI.Converters;

public class JsonValueConverter<T> : ValueConverter<T, string>
{
    public JsonValueConverter() : base(v => JsonConvert.SerializeObject(v),
        v => JsonConvert.DeserializeObject<T>(v))
    {
    }
}