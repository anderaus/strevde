using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Strevde.API.Models.Requests;
using Strevde.API.Models.Responses;
using Strevde.API.Services;
using System.Threading.Tasks;

namespace Strevde.API.Controllers
{
    [Authorize]
    [Route("api/trip")]
    public class TripController : Controller
    {
        private readonly ITripConverter _tripConverter;
        private readonly ITripStorage _tripStorage;

        public TripController(ITripConverter tripConverter, ITripStorage tripStorage)
        {
            _tripConverter = tripConverter;
            _tripStorage = tripStorage;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTrip(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest("id is missing");
            }

            var trip = await _tripStorage.GetTrip(id);
            if (trip == null)
            {
                return NotFound();
            }

            return Ok(trip);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTrip([FromBody]CreateTripRequestModel createTripModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var token = await HttpContext.GetTokenAsync("access_token");
            var trip = await _tripConverter.GenerateTrip(token, createTripModel);
            await _tripStorage.SaveTrip(trip);

            return Ok(new CreateTripResponseModel
            {
                TripId = trip.Id
            });
        }
    }
}