using SignalRChatDatabase.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChatDatabase
{
   
    public class DotsContext : DbContext
    {
        public DotsContext()
            : base("DotsContext")
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<GameTables> GameTables { get; set; }
        public DbSet<MoveTable> MoveTables { get; set; }
        public DbSet<Turnaments> Turnaments { get; set; }
        
    }
}
