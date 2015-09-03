using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChatDatabase.Models
{
    public class MoveTable
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string TableId { get; set; }
        public string Board { get; set; }
        public string CellTaken { get; set; }
        public DateTime TimeMove { get; set; }

        public MoveTable()
        {
                
        }
    }
}
