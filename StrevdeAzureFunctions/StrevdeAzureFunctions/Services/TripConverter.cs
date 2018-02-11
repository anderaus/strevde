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
                    var stravaThumbnailPhotos = (await _activityFetcher.FetchActivityPhotos(activity.Id, 350)).ToList();
                    var stravaFullsizePhotos = (await _activityFetcher.FetchActivityPhotos(activity.Id, 1600)).ToList();

                    var parsedPhotos = new List<Photo>();
                    for (var i = 0; i < stravaThumbnailPhotos.Count; i++)
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

                    parsedActivity.Photos = parsedPhotos;
                }

                parsedActivities.Add(parsedActivity);
            }

            // TODO: Set name, description and other root metadata for trip
            return new Trip
            {
                Activities = parsedActivities.ToArray(),
                Id = GuidEncoder.Encode(Guid.NewGuid()),
                Title = "Some random title",
                Subtitle = "Some random subtitle goes here",
                MapType = "satellite"
            };
        }
    }
}