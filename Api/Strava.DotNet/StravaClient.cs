using Strava.DotNet.Http;
using Strava.DotNet.Operations;
using System;

namespace Strava.DotNet
{
    public class StravaClient : IDisposable
    {
        private bool _disposed;
        private readonly IConnection _connection;

        public StravaClient()
        {
            _connection = new Connection();

            Athlete = new AthleteOperations(_connection);
        }

        public IAthleteOperations Athlete { get; }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed && disposing)
            {
                _connection.Dispose();
                _disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
        }
    }
}