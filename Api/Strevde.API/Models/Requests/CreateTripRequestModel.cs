using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Strevde.API.Models.Requests
{
    public class CreateTripRequestModel
    {
        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public MapType MapType { get; set; }

        [Required]
        [MinLength(2, ErrorMessage = "A trip must have at least 2 activities")]
        public IEnumerable<long> ActivityIDs { get; set; }
    }
}