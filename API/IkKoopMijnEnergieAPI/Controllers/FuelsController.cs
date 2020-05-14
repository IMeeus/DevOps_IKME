using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IkKoopMijnEnergieAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace IkKoopMijnEnergieAPI.Controllers
{
    [Route("api/v1/fuels")]
    public class FuelsController : Controller
    {
        private readonly IkmeDbContext context;

        public FuelsController(IkmeDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult GetAllFuels(string name)
        {
            IQueryable<Fuel> query = context.Fuels;

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(f => f.Name == name);

            var fuels = query.ToList();

            return Json(fuels);
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetFuel(int id)
        {
            var fuel = context.Plans.Find(id);

            if (fuel == null) return NotFound();

            return Json(fuel);
        }

        [HttpPut]
        public IActionResult UpdateFuel([FromBody] Fuel uFuel)
        {
            var oFuel = context.Fuels.Find(uFuel.Id);
            if (oFuel == null) return NotFound();

            oFuel.Name = uFuel.Name;
            oFuel.Capacity = uFuel.Capacity;
            context.SaveChanges();

            return Ok(oFuel);
        }
    }
}