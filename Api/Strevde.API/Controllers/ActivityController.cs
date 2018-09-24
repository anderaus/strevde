using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Strava.DotNet;
using Strevde.API.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Strevde.API.Controllers
{
    [Authorize]
    [Route("api/activities")]
    public class ActivityController : Controller
    {
        private readonly StravaClient _client;
        private readonly IMapper _mapper;

        public ActivityController(StravaClient client, IMapper mapper)
        {
            _client = client;
            _mapper = mapper;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetActivities(int page = 1, int activitiesPerPage = 10)
        {
            var token = await HttpContext.GetTokenAsync("access_token");
            var activities = await _client.Athlete.GetActivities(token, page, activitiesPerPage);

            return Ok(_mapper.Map<IEnumerable<ActivityViewModel>>(activities));
        }
    }
}