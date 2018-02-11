using Newtonsoft.Json;
using System.Collections.Generic;

namespace StrevdeAzureFunctions.Models
{
    public class StravaPhoto
    {
        [JsonProperty("unique_id")]
        public string UniqueId { get; set; }

        [JsonProperty("caption")]
        public string Caption { get; set; }

        [JsonProperty("urls")]
        public Dictionary<string, string> Urls { get; set; }

        [JsonProperty("sizes")]
        public Dictionary<string, string[]> Sizes { get; set; }
    }
}