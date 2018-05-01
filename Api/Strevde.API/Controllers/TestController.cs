using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Collections.Specialized;

namespace Strevde.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new[] { "value1", "value2" };
        }

        [HttpGet("secret")]
        public IActionResult GetSecret()
        {
            var claimPairs = new StringDictionary();

            foreach (var claim in HttpContext.User.Claims)
            {
                claimPairs.Add(claim.Type, claim.Value);
            }

            return Ok(claimPairs);
        }
    }
}