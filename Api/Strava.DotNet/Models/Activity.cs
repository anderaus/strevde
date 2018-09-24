using Newtonsoft.Json;
using System;

namespace Strava.DotNet.Models
{
    public class Activity
    {
        public long Id { get; set; }

        [JsonProperty("start_date")]

        public DateTime StartDate { get; set; }

        public string Name { get; set; }

        public decimal Distance { get; set; }

        [JsonProperty("moving_time")]
        public int MovingTime { get; set; }

        [JsonProperty("elapsed_time")]
        public int ElapsedTime { get; set; }

        [JsonProperty("total_elevation_gain")]
        public decimal TotalElevationGain { get; set; }

        public string Type { get; set; }

        public Map Map { get; set; }

        [JsonProperty("total_photo_count")]
        public int TotalPhotoCount { get; set; }
    }
}