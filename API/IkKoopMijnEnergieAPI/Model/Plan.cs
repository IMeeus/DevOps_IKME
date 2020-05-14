using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IkKoopMijnEnergieAPI.Model
{
    public class Plan
    {
        [Key]
        public int Id { get; set; }

        public string Uid { get; set; }

        public string Name { get; set; }

        public DateTime Date { get; set; }

        public List<QuarterData> Data { get; set; }
    }
}
