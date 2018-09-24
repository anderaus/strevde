using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Strava.DotNet.Http
{
    public interface IConnection : IDisposable
    {
        Task<T> Get<T>(string relativeUrl, string accessToken, IDictionary<string, string> parameters = null);
    }
}