using System.Collections.Generic;

namespace StrevdeAzureFunctions.Models
{
    public class ActivitiesRequestBody
    {
        public IEnumerable<string> ActivityIDs { get; set; }
    }
}