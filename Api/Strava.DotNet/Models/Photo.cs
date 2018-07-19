using Newtonsoft.Json;
using System.Collections.Generic;

namespace Strava.DotNet.Models
{
    public class Photo
    {
        [JsonProperty("unique_id")]
        public string UniqueId { get; set; }

        public string Caption { get; set; }

        public Dictionary<string, string> Urls { get; set; }

        public Dictionary<string, string[]> Sizes { get; set; }
    }
}