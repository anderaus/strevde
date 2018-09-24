using System.ComponentModel.DataAnnotations;

namespace Strevde.API.Models.Responses
{
    public class CreateTripResponseModel
    {
        [Required]
        public string TripId { get; set; }
    }
}