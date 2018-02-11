using StrevdeAzureFunctions.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace StrevdeAzureFunctions.Services
{
    public class StravaFetcher : IActivityFetcher
    {
        private readonly HttpClient _httpClient;

        public StravaFetcher(HttpClient httpClient, string stravaBearerToken)
        {
            _httpClient = httpClient;
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", stravaBearerToken);
        }

        public async Task<IEnumerable<StravaActivity>> FetchActivities(IEnumerable<string> activityIDs)
        {
            var activities = new List<StravaActivity>();

            foreach (var activityId in activityIDs)
            {
                var response = await _httpClient.GetAsync(new Uri($"https://www.strava.com/api/v3/activities/{activityId}"));
                response.EnsureSuccessStatusCode();

                var activity = await response.Content.ReadAsAsync<StravaActivity>();
                activities.Add(activity);
            }

            return activities;
        }

        public async Task<IEnumerable<StravaPhoto>> FetchActivityPhotos(decimal activityId, int matchWidth)
        {
            var response = await _httpClient.GetAsync(new Uri($"https://www.strava.com/api/v3/activities/{activityId}/photos?photo_sources=true&size={matchWidth}"));
            response.EnsureSuccessStatusCode();

            var photos = await response.Content.ReadAsAsync<IEnumerable<StravaPhoto>>();

            return photos;
        }
    }
}