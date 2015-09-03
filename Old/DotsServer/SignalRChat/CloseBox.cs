using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRChat
{
    public class CloseBox
    {
        public bool IsClose { get; set; }
        public int RowUp { get; set; }
        public int ColUp { get; set; }
        public int RowDown { get; set; }
        public int ColDown { get; set; }


        public CloseBox(bool isClose)
        {
            this.IsClose = isClose;
        }
    }
}