using System;

namespace Strevde.API.ViewModels
{
    public class ActivityViewModel
    {
        public long Id { get; set; }
        public DateTime StartDate { get; set; }
        public string Name { get; set; }
        public string Distance { get; set; }
        public int ElapsedTime { get; set; }
        public string Type { get; set; }
    }
}