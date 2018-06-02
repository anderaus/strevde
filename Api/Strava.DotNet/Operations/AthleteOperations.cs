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

            var activitiesResult = await Connection.Get<IEnumerable<Activity>>(
                "athlete/activities",
                token,
                parameters);

            return activitiesResult;
        }
    }
}