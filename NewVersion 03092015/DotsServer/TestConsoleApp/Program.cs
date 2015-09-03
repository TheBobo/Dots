using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            SignalRChatDatabase.DotsContext context = new SignalRChatDatabase.DotsContext();
            DateTime dt = DateTime.Now;
            var turnamentsStars = context.Turnaments.Where(x => x.StartTime <= dt && x.IsSeatAndGo == false).ToList();
            foreach (var turnament in turnamentsStars)
            {
                Console.WriteLine(turnament.Name);
            }
          
        }
    }
}
