using Strava.DotNet.Http;
using Strava.DotNet.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Strava.DotNet.Operations
{
    public class AthleteOperations : OperationsBase, IAthleteOperations
    {
        public AthleteOperations(IConnection connection) : base(connection) { }

        public async Task<IEnumerable<Activity>> GetActivities(string token, int page = 1, int activitiesPerPage = 10)
        {
            var parameters = new Dictionary<string, string>
            {
                {"page", page.ToString()},
                {"per_page", activitiesPerPage.ToString()}
            };

            var activities = await Connection.Get<IEnumerable<Activity>>(
                "athlete/activities",
                token,
                parameters);

            return activities;
        }

        public async Task<Activity> GetActivity(string token, long activityId)
        {
            var activity = await Connection.Get<Activity>(
                $"activities/{activityId}",
                token);

            return activity;
        }

        public async Task<IEnumerable<Photo>> GetActivityPhotos(string token, long activityId, int matchWidth)
        {
            var parameters = new Dictionary<string, string>
            {
                {"photo_sources", "true"},
                {"size", matchWidth.ToString()}
            };

            var photos = await Connection.Get<IEnumerable<Photo>>(
                $"activities/{activityId}/photos",
                token,
                parameters
            );

            return photos;
        }
    }
}