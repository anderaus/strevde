using Newtonsoft.Json;
using System;

namespace StrevdeAzureFunctions.Models
{
    public class StravaActivity
    {
        public decimal Id { get; set; }
        public string Name { get; set; }
        public decimal Distance { get; set; }
        [JsonProperty("moving_time")]
        public int MovingTime { get; set; }
        [JsonProperty("elapsed_time")]
        public int ElapsedTime { get; set; }
        [JsonProperty("total_elevation_gain")]
        public decimal TotalElevationGain { get; set; }
        public string Type { get; set; }
        [JsonProperty("start_date")]
        public DateTime StartDate { get; set; }
        public StravaMap Map { get; set; }
        [JsonProperty("total_photo_count")]
        public int TotalPhotoCount { get; set; }
        public string Description { get; set; }
    }
}