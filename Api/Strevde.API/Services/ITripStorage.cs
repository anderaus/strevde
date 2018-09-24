using Strevde.API.Models.Storage;
using System.Threading.Tasks;

namespace Strevde.API.Services
{
    public interface ITripStorage
    {
        Task SaveTrip(Trip trip);
        Task<Trip> GetTrip(string tripId);
    }
}