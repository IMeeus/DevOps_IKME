using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IkKoopMijnEnergieAPI.Model
{
    public class QuarterData
    {
        public int Total { get; set; }
        public int Sun { get; set; }
        public int Wind { get; set; }
        public int Nuclear { get; set; }
        public int Biomassa { get; set; }
        public int Steg { get; set; }
        public int Error { get; set; }
    }
}