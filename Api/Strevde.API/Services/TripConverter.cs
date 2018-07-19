using Strava.DotNet;
using Strevde.API.Models.Requests;
using Strevde.API.Models.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Strevde.API.Services
{
    public class TripConverter : ITripConverter
    {
        private readonly StravaClient _client;

        public TripConverter(StravaClient client)
        {
            _client = client;
        }

        public async Task<Trip> GenerateTrip(string token, CreateTripRequestModel createTripRequestModel)
        {
            var stravaActivities = new List<Strava.DotNet.Models.Activity>();

            // TODO: Parallellize to speed this up
            foreach (var activityId in createTripRequestModel.ActivityIDs)
            {
                stravaActivities.Add(await _client.Athlete.GetActivity(token, activityId));
            }

            var parsedActivities = new List<Activity>();
            foreach (var activity in stravaActivities)
            {
                var parsedActivity = new Activity
                {
                    Id = activity.Id,
                    Distance = activity.Distance,
                    ElapsedTime = activity.ElapsedTime,
                    MovingTime = activity.MovingTime,
                    Polyline = activity.Map.Polyline,
                    Title = activity.Name,
                    TotalElevationGain = activity.TotalElevationGain
                };

                if (activity.TotalPhotoCount > 0)
                {
                    parsedActivity.Photos = await FetchPhotos(token, activity.Id);
                }

                parsedActivities.Add(parsedActivity);
            }

            return new Trip
            {
                Activities = parsedActivities.ToArray(),
                Id = GuidEncoder.Encode(Guid.NewGuid()),
                Title = createTripRequestModel.Title,
                Subtitle = createTripRequestModel.Description,
                MapType = createTripRequestModel.MapType.ToString().ToLower()
            };
        }

        private async Task<IEnumerable<Photo>> FetchPhotos(string token, long activityId)
        {
            var stravaThumbnailPhotos = (await _client.Athlete.GetActivityPhotos(token, activityId, 350)).ToList();
            var stravaFullsizePhotos = (await _client.Athlete.GetActivityPhotos(token, activityId, 1600)).ToList();

            var parsedPhotos = new List<Photo>();
            for (var i = 0; i < stravaThumbnailPhotos.Count(); i++)
            {
                parsedPhotos.Add(new Photo
                {
                    Id = stravaFullsizePhotos[i].UniqueId,
                    Caption = stravaFullsizePhotos[i].Caption,
                    Url = stravaFullsizePhotos[i].Urls.Values.Single(),
                    Width = stravaFullsizePhotos[i].Sizes.Values.Single()[0],
                    Height = stravaFullsizePhotos[i].Sizes.Values.Single()[1],
                    ThumbnailUrl = stravaThumbnailPhotos[i].Urls.Values.Single(),
                    ThumbnailWidth = stravaThumbnailPhotos[i].Sizes.Values.Single()[0],
                    ThumbnailHeight = stravaThumbnailPhotos[i].Sizes.Values.Single()[1]
                });
            }

            return parsedPhotos;
        }
    }
}