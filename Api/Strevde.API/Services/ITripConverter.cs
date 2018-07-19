using Strevde.API.Models.Requests;
using Strevde.API.Models.Storage;
using System.Threading.Tasks;

namespace Strevde.API.Services
{
    public interface ITripConverter
    {
        Task<Trip> GenerateTrip(string token, CreateTripRequestModel createTripRequestModel);
    }
}