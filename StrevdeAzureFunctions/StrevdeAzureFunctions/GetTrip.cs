using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using StrevdeAzureFunctions.Models;
using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace StrevdeAzureFunctions
{
    public static class GetTrip
    {
        [FunctionName("GetTrip")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "trip/{id}")]HttpRequestMessage req,
            string id,
            TraceWriter log)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return req.CreateErrorResponse(HttpStatusCode.BadRequest, "id not set");
            }

            log.Info($"GetTrip received trip id {id}");

            var connectionString = ConfigurationManager.AppSettings.Get("StrevdeCosmosDBConnection");
            var endpoint = connectionString.Split(';')[0].Substring(16);
            var key = connectionString.Split(';')[1].Substring(11).TrimEnd(';');

            var documentClient = new DocumentClient(new Uri(endpoint), key);

            var trip = documentClient.CreateDocumentQuery<Trip>(
                    UriFactory.CreateDocumentCollectionUri("strevde_test", "trips"), new FeedOptions { MaxItemCount = 1 })
                .Where(t => t.Id == id)
                .AsEnumerable()
                .FirstOrDefault();

            return trip == null
                ? req.CreateErrorResponse(HttpStatusCode.NotFound, $"No trip with id {id} found")
                : req.CreateResponse(HttpStatusCode.OK, trip);
        }
    }
}