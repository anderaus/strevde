using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using StrevdeAzureFunctions.Models;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace StrevdeAzureFunctions
{
    public static class ParseActivities
    {
        [FunctionName("ParseActivities")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "activities")]HttpRequestMessage req, TraceWriter log)
        {
            log.Info("C# HTTP trigger function processed a request.");

            var activitiesRequestBody = await req.Content.ReadAsAsync<ActivitiesRequestBody>();
            log.Info($"Got {activitiesRequestBody.ActivityIDs.Count()} activities:");
            foreach (var activityId in activitiesRequestBody.ActivityIDs)
            {
                log.Info($"\tID: {activityId}");
            }

            return req.CreateResponse(HttpStatusCode.OK);
        }
    }
}