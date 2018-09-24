using Strava.DotNet.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Strava.DotNet.Operations
{
    public interface IAthleteOperations
    {
        Task<IEnumerable<Activity>> GetActivities(string token, int page = 1, int activitiesPerPage = 10);
        Task<Activity> GetActivity(string token, long activityId);
        Task<IEnumerable<Photo>> GetActivityPhotos(string token, long activityId, int matchWidth);
    }
}