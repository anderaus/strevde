using AutoMapper;
using Strava.DotNet.Models;
using Strevde.API.ViewModels;

namespace Strevde.API.Mapping
{
    public class StravaMappingProfile : Profile
    {
        public StravaMappingProfile()
        {
            CreateMap<Activity, ActivityViewModel>();
        }
    }
}