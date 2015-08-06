using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRChat
{
    public class CellObj
    {
        public string Id { get; set; }
        public int Row { get; set; }
        public int Col { get; set; }
        public bool IsHorizontal { get; set; }
        public bool Taken { get; set; }

        public CellObj()
        {
                
        }

        public CellObj(string cell)
        {
            this.Id = cell;

           var cellInfo = cell.Split('-');
           
           this.Row  = int.Parse(cellInfo[0]);
           this.Col = int.Parse(cellInfo[1]);
           if (cellInfo.Length > 2)
           {
               if (int.Parse(cellInfo[2]) == 0)
               {
                   this.Taken = false;
               }
               else
               {
                   this.Taken = true;
               }
           }
           else
           {
               this.Taken = false;
           }
       if (this.Row%2 == 0 && this.Col%2 == 1)
       {
           this.IsHorizontal = true;
       }
       else if (this.Row%2 == 1 && this.Col%2 == 0)
       {
           this.IsHorizontal = false;
       }


        }

        public override string ToString()
        {
            string result = this.Row.ToString();
            result  = result + "-";
            result = result + this.Col;
            result = result + "-";
            if (this.Taken)
            {
                result = result + 1;
            }
            else
            {
                result = result + 0;
            }
            
            return result;
        }
    }
}