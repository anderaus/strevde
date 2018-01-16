using Newtonsoft.Json;

namespace StrevdeAzureFunctions.Models
{
    public class TripResponseBody
    {
        [JsonProperty("tripId")]
        public string TripId { get; set; }
    }
}