using Newtonsoft.Json;
using System.Collections.Generic;

namespace Strevde.API.Models.Storage
{
    public class Activity
    {
        [JsonProperty("id")]
        public decimal Id { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("polyline")]
        public string Polyline { get; set; }
        [JsonProperty("distance")]
        public decimal Distance { get; set; }
        [JsonProperty("moving_time")]
        public int MovingTime { get; set; }
        [JsonProperty("elapsed_time")]
        public int ElapsedTime { get; set; }
        [JsonProperty("total_elevation_gain")]
        public decimal TotalElevationGain { get; set; }
        [JsonProperty("photos")]
        public IEnumerable<Photo> Photos { get; set; }
    }
}