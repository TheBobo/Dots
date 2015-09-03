using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using SignalRChatDatabase.Models;

namespace SignalRChatDatabase
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string UserWebClientId { get; set; }
        [StringLength(20)]
        public string DeviceId { get; set; }
        [StringLength(20)]
        public string Username { get; set; }
        public bool IsOnline { get; set; }

        public List<Turnaments> MyTurnament { get; set; }

        public Users()
        {

        }

        public Users(Users user)
        {
            this.DeviceId = user.DeviceId;
            this.UserWebClientId = user.UserWebClientId;
        }
    }
}
