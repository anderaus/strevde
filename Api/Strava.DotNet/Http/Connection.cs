using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Strava.DotNet.Http
{
    public class Connection : IConnection
    {
        private const string ApiBaseUrl = "https://www.strava.com/api/v3/";
        private bool _disposed;

        private readonly HttpClient _httpClient;

        public Connection()
        {
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri(ApiBaseUrl)
            };
        }

        public async Task<T> Get<T>(string relativeUrl, string accessToken, IDictionary<string, string> parameters = null)
        {
            if (parameters != null)
            {
                relativeUrl = string.Concat(relativeUrl, "?", GetParametersQuery(parameters));
            }

            var requestMessage = new HttpRequestMessage(HttpMethod.Get, relativeUrl);
            requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            var response = await _httpClient.SendAsync(requestMessage);

            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(responseContent);
        }
        private static string GetParametersQuery(IDictionary<string, string> parameters)
        {
            return string.Join("&", parameters.Select(kvp => kvp.Key + "=" + Uri.EscapeDataString(kvp.Value)));
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed && disposing)
            {
                _httpClient.Dispose();
                _disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
        }
    }
}