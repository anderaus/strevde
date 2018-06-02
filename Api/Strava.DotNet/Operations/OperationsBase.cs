using Strava.DotNet.Http;

namespace Strava.DotNet.Operations
{
    public abstract class OperationsBase
    {
        protected IConnection Connection { get; }

        protected OperationsBase(IConnection connection)
        {
            Connection = connection;
        }
    }
}