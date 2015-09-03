using SignalRChatDatabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestApp
{
    class Program
    {
        static void Main(string[] args)
        {
            DotsContext context = new DotsContext();
            DateTime dt = DateTime.Now;
            var turnamentsStars = context.Turnaments.Where(x => x.StartTime <= dt && x.IsSeatAndGo == false).ToList();
            Console.WriteLine(turnamentsStars.Count);
            foreach (var turnament in turnamentsStars)
            {
                Console.WriteLine(turnament.Playes.Count);
                foreach (var player in turnament.Playes)
                {
                    Console.WriteLine(player.Username);
                    Console.WriteLine(player.UserWebClientId);
                }
            }
        }
    }
}
