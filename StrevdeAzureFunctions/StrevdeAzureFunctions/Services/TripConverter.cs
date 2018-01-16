using StrevdeAzureFunctions.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StrevdeAzureFunctions.Services
{
    public class TripConverter
    {
        private readonly IActivityFetcher _activityFetcher;

        public TripConverter(IActivityFetcher activityFetcher)
        {
            _activityFetcher = activityFetcher;
        }

        public async Task<Trip> GenerateTrip(IEnumerable<string> activityIDs)
        {
            var stravaActivities = (await _activityFetcher.FetchActivities(activityIDs)).ToList();

            var parsedActivities = new List<Activity>();
            foreach (var activity in stravaActivities)
            {
                parsedActivities.Add(new Activity
                {
                    Id = activity.Id,
                    Distance = activity.Distance,
                    ElapsedTime = activity.ElapsedTime,
                    MovingTime = activity.MovingTime,
                    Polyline = activity.Map.Polyline,
                    Title = activity.Name,
                    TotalElevationGain = activity.TotalElevationGain
                });
            }

            // TODO: Fetch photos using photos api and add to result
            // TODO: Set name, description and other root metadata for trip
            return new Trip
            {
                Activities = parsedActivities.ToArray(),
                Id = Guid.NewGuid(),
                Title = "Some random title",
                Subtitle = "Some random subtitle goes here",
                MapType = "satellite"
            };
        }
    }
}