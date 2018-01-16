using Newtonsoft.Json;

namespace StrevdeAzureFunctions.Models
{
    public class TripRequestBody
    {
        [JsonProperty("tripId")]
        public string TripId { get; set; }
    }
}