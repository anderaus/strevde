using StrevdeAzureFunctions.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace StrevdeAzureFunctions
{
    internal class StravaParser
    {
        private readonly HttpClient _httpClient;
        private readonly List<StravaActivity> _stravaActivities = new List<StravaActivity>();

        public StravaParser(HttpClient httpClient, string stravaBearerToken)
        {
            _httpClient = httpClient;
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", stravaBearerToken);
        }

        internal async Task DownloadActivities(IEnumerable<string> activityIDs)
        {
            _stravaActivities.Clear();

            foreach (var activityId in activityIDs)
            {
                var response = await _httpClient.GetAsync(new Uri($"https://www.strava.com/api/v3/activities/{activityId}"));
                response.EnsureSuccessStatusCode();

                var activity = await response.Content.ReadAsAsync<StravaActivity>();
                _stravaActivities.Add(activity);
            }
        }

        internal Trip ParseAsTrip()
        {
            if (_stravaActivities == null || !_stravaActivities.Any())
            {
                throw new Exception("No Strava activities loaded");
            }

            var parsedActivities = new List<Activity>();
            foreach (var stravaActivity in _stravaActivities)
            {
                parsedActivities.Add(new Activity
                {
                    Id = stravaActivity.Id,
                    Distance = stravaActivity.Distance,
                    ElapsedTime = stravaActivity.ElapsedTime,
                    MovingTime = stravaActivity.MovingTime,
                    Polyline = stravaActivity.Map.Polyline,
                    Title = stravaActivity.Name,
                    TotalElevationGain = stravaActivity.TotalElevationGain
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