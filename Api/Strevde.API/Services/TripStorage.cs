using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Strevde.API.Models.Storage;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Strevde.API.Services
{
    public class TripStorage : ITripStorage
    {
        private readonly DocumentClient _client;

        public TripStorage(string endpointUri, string authKey)
        {
            _client = new DocumentClient(new Uri(endpointUri), authKey);
        }

        public async Task SaveTrip(Trip trip)
        {
            var documentUri = UriFactory.CreateDocumentCollectionUri("strevde_test", "trips");
            await _client.UpsertDocumentAsync(documentUri, trip);
        }

        public async Task<Trip> GetTrip(string tripId)
        {
            var documentUri = UriFactory.CreateDocumentUri("strevde_test", "trips", tripId);

            try
            {
                var result = await _client.ReadDocumentAsync<Trip>(documentUri);
                return result.Document;
            }
            catch (DocumentClientException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
            {
                return null;
            }
        }
    }
}