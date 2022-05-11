using System.Net;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace HealthyAtHomeTests;

public class ExerciseControllerTests
{
    [Fact]
    public async Task Get_retrieves_all_exercises()
    {
        await using var application = new WebApplicationFactory<Program>();
        using var client = application.CreateClient();

        var response = await client.GetAsync("/api/exercise/all");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }
}