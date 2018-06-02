using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Strevde.API.ViewModels;
using System.Collections.Specialized;
using System.Linq;

namespace Strevde.API.Controllers
{
    [Authorize]
    [Route("api/user")]
    public class UserController : Controller
    {
        [AllowAnonymous]
        [HttpGet("")]
        public IActionResult GetUserinfo()
        {
            if (!HttpContext.User.Identity.IsAuthenticated)
                return Unauthorized();

            return Ok(new UserInfo
            {
                UserId = GetClaimValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"),
                FirstName = GetClaimValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"),
                AvatarUrl = GetClaimValue("urn:strava:profile-medium")
            });
        }

        private string GetClaimValue(string claimName)
        {
            return HttpContext.User.Claims.Single(c => c.Type == claimName).Value;
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