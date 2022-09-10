using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;

namespace HealthyAtHomeAPI.Controllers;

public class FallbackController : Controller
{
    public IActionResult Index()
    {
        return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "index.html"),
            MediaTypeNames.Text.Html);
    }
}