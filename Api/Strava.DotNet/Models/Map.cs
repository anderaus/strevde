using Newtonsoft.Json;

namespace Strava.DotNet.Models
{
    public class Map
    {
        public string Polyline { get; set; }

        [JsonProperty("summary_polyline")]
        public string SummaryPolyline { get; set; }
    }
}