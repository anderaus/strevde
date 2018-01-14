using Newtonsoft.Json;

namespace StrevdeAzureFunctions.Models
{
    public class Photo
    {
        [JsonProperty("url")]
        public string Url { get; set; }
    }
}