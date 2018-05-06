using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace Strevde.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        [HttpGet("signin")]
        public IActionResult Signin(string returnUrl)
        {
            return Challenge(new AuthenticationProperties { RedirectUri = string.IsNullOrEmpty(returnUrl) ? "/" : returnUrl }, "Strava");
        }

        [HttpGet("signout"), HttpPost("signout")]
        public IActionResult SignOut()
        {
            return SignOut(new AuthenticationProperties { RedirectUri = "/" },
                CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}