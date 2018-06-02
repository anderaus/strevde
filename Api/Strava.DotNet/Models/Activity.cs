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
        public string Distance { get; set; }
        [JsonProperty("elapsed_time")]
        public int ElapsedTime { get; set; }
        public string Type { get; set; }
    }
}