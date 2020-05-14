using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace PlanDataGenerator
{
    class Data
    {
        public int Total { get; set; }
        public int Sun { get; set; }
        public int Wind { get; set; }
        public int Nuclear { get; set; }
        public int Biomassa { get; set; }
        public int Steg { get; set; }
        public int Error { get; set; }
    }

    class Program
    {
        private const int MAX_TOTAL = 1000;
        private static string LOCATION = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) + @"\samples\";
        private const string FILENAME = "new_data.txt";

        static void Main(string[] args)
        {
            Random random = new Random();
            List<Data> data = new List<Data>();

            for (int i = 0; i < 96; i++)
            {
                int total = random.Next(MAX_TOTAL);

                List<int> temp = new List<int>()
                {
                    0,
                    random.Next(total),
                    random.Next(total),
                    random.Next(total),
                    random.Next(total),
                    total
                };

                temp.Sort();

                data.Add(new Data()
                {
                    Total =     total,
                    Sun =       temp[5] - temp[4],
                    Wind =      temp[4] - temp[3],
                    Nuclear =   temp[3] - temp[2],
                    Biomassa =  temp[2] - temp[1],
                    Steg =      temp[1] - temp[0],
                    Error =     0
                });
            }

            using (StreamWriter file = File.CreateText(LOCATION + FILENAME))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, data);
            }
        }
    }
}
