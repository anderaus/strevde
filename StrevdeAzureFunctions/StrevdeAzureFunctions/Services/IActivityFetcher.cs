using StrevdeAzureFunctions.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StrevdeAzureFunctions.Services
{
    public interface IActivityFetcher
    {
        Task<IEnumerable<StravaActivity>> FetchActivities(IEnumerable<string> activityIDs);
    }
}