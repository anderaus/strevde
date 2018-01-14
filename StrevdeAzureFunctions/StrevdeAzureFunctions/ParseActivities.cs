using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using StrevdeAzureFunctions.Models;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace StrevdeAzureFunctions
{
    public static class ParseActivities
    {
        private static readonly HttpClient HttpClient = new HttpClient();

        [FunctionName("ParseActivities")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "activities")] HttpRequestMessage req,
            [DocumentDB("strevde_test", "trips", CreateIfNotExists = false, ConnectionStringSetting = "StrevdeCosmosDBConnection")] IAsyncCollector<dynamic> documents,
            TraceWriter log)
        {
            var activitiesRequestBody = await req.Content.ReadAsAsync<ActivitiesRequestBody>();
            log.Info($"Got {activitiesRequestBody.ActivityIDs.Count()} activities:");
            foreach (var activityId in activitiesRequestBody.ActivityIDs)
            {
                log.Info($"\tID: {activityId}");
            }

            // Fetch all activity data from Strava
            var stravaParser = new StravaParser(HttpClient, ConfigurationManager.AppSettings.Get("StravaBearerToken"));
            await stravaParser.DownloadActivities(activitiesRequestBody.ActivityIDs);
            var trip = stravaParser.ParseAsTrip();

            // Upsert to Azure Cosmos DB
            await documents.AddAsync(trip);

            return req.CreateResponse(HttpStatusCode.OK);
        }
    }
}