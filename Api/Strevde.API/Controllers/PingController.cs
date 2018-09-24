using Microsoft.AspNetCore.Mvc;
using System;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;

namespace Strevde.API.Controllers
{
    [Route("api/ping")]
    public class PingController : Controller
    {
        public IActionResult Ping()
        {
            return Ok(new
            {
                Hello = "World",
                RuntimeInformation.FrameworkDescription,
                Assembly
                    .GetEntryAssembly()?
                    .GetCustomAttribute<TargetFrameworkAttribute>()?
                    .FrameworkName,
                RuntimeInformation.OSDescription,
                OSArchitecture = RuntimeInformation.OSArchitecture.ToString(),
                ServerTime = DateTime.Now
            });
        }
    }
}