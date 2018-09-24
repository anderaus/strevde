using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Strevde.API.ViewModels;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;

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

        [HttpGet("debug")]
        public async Task<IActionResult> GetSecret()
        {
            var props = new StringDictionary();

            foreach (var claim in HttpContext.User.Claims)
            {
                props.Add(claim.Type, claim.Value);
            }
            props.Add("accessToken", await HttpContext.GetTokenAsync("access_token"));

            return Ok(props);
        }
    }
}