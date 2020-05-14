using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IkKoopMijnEnergieAPI.Model
{
    public class Fuel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double Capacity { get; set; }
        public double Stability { get; set; }
    }
}
