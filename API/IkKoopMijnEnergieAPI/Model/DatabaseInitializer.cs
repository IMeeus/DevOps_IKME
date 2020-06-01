using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkKoopMijnEnergieAPI.Model
{
    public class DatabaseInitializer
    {
        public static void Intialize(IkmeDbContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            if (!context.Plans.Any())
            {
                LoadTestPlans(context);
                LoadTestFuels(context);
                context.SaveChanges();
            }
        }

        private static void LoadTestPlans(IkmeDbContext context)
        {
            Random random = new Random();

            var data = new List<QuarterData>();
            for (int i = 0; i < 96; i++) {
                var quarter = new QuarterData();
                quarter.Total = random.Next(0, 1000);
                quarter.Sun = random.Next(0, 1000);
                quarter.Wind = random.Next(0, 1000);
                quarter.Nuclear = random.Next(0, 1000);
                quarter.Biomassa = random.Next(0, 1000);
                quarter.Steg = random.Next(0, 1000);
                quarter.Error = 0;
                data.Add(quarter);
            }

            Plan plan = new Plan()
            {
                Uid = "oRORSIGDUUQxFN7dLPiWibvtsuI3",
                Name = "Test Plan",
                Date = DateTime.Now,
                Data = data
            };

            context.Plans.Add(plan);
            
            var data2 = new List<QuarterData>();
            for (int i = 0; i < 96; i++) {
                var quarter = new QuarterData();
                quarter.Total = random.Next(0, 1000);
                quarter.Sun = random.Next(0, 1000);
                quarter.Wind = random.Next(0, 1000);
                quarter.Nuclear = random.Next(0, 1000);
                quarter.Biomassa = random.Next(0, 1000);
                quarter.Steg = random.Next(0, 1000);
                quarter.Error = 0;
                data2.Add(quarter);
            }

            Plan plan2 = new Plan()
            {
                Uid = "oRORSIGDUUQxFN7dLPiWibvtsuI3",
                Name = "Test Plan 2",
                Date = DateTime.Now,
                Data = data2
            };

            context.Plans.Add(plan2);
        }

        private static void LoadTestFuels(IkmeDbContext context)
        {
            Fuel sun = new Fuel()
            {
                Name = "Sun",
                Price = .01,
                Capacity = 10000,
                Stability = .02
            };

            Fuel wind = new Fuel()
            {
                Name = "Wind",
                Price = .02,
                Capacity = 10000,
                Stability = .08
            };

            Fuel nuclear = new Fuel()
            {
                Name = "Nuclear",
                Price = .03,
                Capacity = 10000,
                Stability = .5
            };

            Fuel biomassa = new Fuel()
            {
                Name = "Biomassa",
                Price = .04,
                Capacity = 10000,
                Stability = .1
            };

            Fuel steg = new Fuel()
            {
                Name = "Steg",
                Price = .05,
                Capacity = 10000,
                Stability = .3
            };

            context.Fuels.Add(sun);
            context.Fuels.Add(wind);
            context.Fuels.Add(nuclear);
            context.Fuels.Add(biomassa);
            context.Fuels.Add(steg);

            context.SaveChanges();
        }
    }
}
