using Newtonsoft.Json;

namespace StrevdeAzureFunctions.Models
{
    public class Photo
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("caption")]
        public string Caption { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("width")]
        public string Width { get; set; }

        [JsonProperty("height")]
        public string Height { get; set; }

        [JsonProperty("thumbnail_url")]
        public string ThumbnailUrl { get; set; }

        [JsonProperty("thumbnail_width")]
        public string ThumbnailWidth { get; set; }

        [JsonProperty("thumbnail_height")]
        public string ThumbnailHeight { get; set; }
    }
}