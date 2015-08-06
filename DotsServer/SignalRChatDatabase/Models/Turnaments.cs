using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChatDatabase.Models
{
    public class Turnaments
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Seats { get; set; }
        public DateTime StartTime { get; set; }
        public bool IsSeatAndGo { get; set; }
        public bool RegistationOpen { get; set; }
        public double EntryCost { get; set; }
        public int Taxes { get; set; }
        public int TakenSeats { get; set; }
        public SignalRChatDatabase.TurnamentsType Type { get; set; }

        public int SizeX { get; set; }
        public int SizeY { get; set; }

        public virtual List<Users> Playes { get; set; }

        public Turnaments()
        {
                
        }

        public Turnaments(Turnaments turnament)
        {
            this.Id = turnament.Id;
            this.Name = turnament.Name;
            this.Seats = turnament.Seats;
            this.StartTime = turnament.StartTime;
            this.IsSeatAndGo = turnament.IsSeatAndGo;
            this.RegistationOpen = turnament.RegistationOpen;
            this.EntryCost = turnament.EntryCost;
            this.Taxes = turnament.Taxes;
            this.TakenSeats = turnament.TakenSeats;
            this.SizeX = turnament.SizeX;
            this.SizeY = turnament.SizeY;

        }
    }
}
