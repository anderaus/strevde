using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using StrevdeAzureFunctions.Models;
using StrevdeAzureFunctions.Services;
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
            if (activitiesRequestBody.ActivityIDs.Count() > 50)
            {
                return req.CreateErrorResponse(HttpStatusCode.BadRequest, "Maximum 50 activities");
            }

            var stravaFetcher = new StravaFetcher(HttpClient, ConfigurationManager.AppSettings.Get("StravaBearerToken"));
            var tripConverter = new TripConverter(stravaFetcher);

            var trip = await tripConverter.GenerateTrip(activitiesRequestBody.ActivityIDs);

            // Upsert to Azure Cosmos DB
            await documents.AddAsync(trip);

            return req.CreateResponse(HttpStatusCode.OK,
                new TripResponseBody { TripId = trip.Id });
        }
    }
}