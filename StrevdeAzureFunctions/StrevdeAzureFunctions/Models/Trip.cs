using Newtonsoft.Json;
using System;

namespace StrevdeAzureFunctions.Models
{
    public class Trip
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
        [JsonProperty("maptype")]
        public string MapType { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("subtitle")]
        public string Subtitle { get; set; }
        [JsonProperty("activities")]
        public Activity[] Activities { get; set; }
    }
}