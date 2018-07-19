using Newtonsoft.Json;

namespace Strevde.API.Models.Storage
{
    public class Trip
    {
        [JsonProperty("id")]
        public string Id { get; set; }
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