using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IkKoopMijnEnergieAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IkKoopMijnEnergieAPI.Controllers
{
    [Route("api/v1/plans")]
    public class PlansController : Controller
    {
        private readonly IkmeDbContext context;

        public PlansController(IkmeDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult GetAllPlans(string uid, string name)
        {
            IQueryable<Plan> query = context.Plans;

            if (!string.IsNullOrWhiteSpace(uid))
                query = query.Where(p => p.Uid == uid);
            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(p => p.Name == name);

            var plans = query.ToList();

            return Json(plans);
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetPlan(int id)
        {
            var plan = context.Plans.Find(id);

            if (plan == null) return NotFound();

            return Json(plan);
        }

        [HttpPost]
        public IActionResult CreatePlan([FromBody] Plan newPlan)
        {
            context.Plans.Add(newPlan);
            context.SaveChanges();
            return Created("", newPlan);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeletePlan(int id)
        {
            var plan = context.Plans.Find(id);
            if (plan == null) return NotFound();

            context.Plans.Remove(plan);
            context.SaveChanges();

            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdatePlan([FromBody] Plan uPlan)
        {
            var oPlan = context.Plans.Find(uPlan.Id);
            if (oPlan == null)
                return CreatePlan(uPlan);

            oPlan.Uid = uPlan.Uid;
            oPlan.Name = uPlan.Name;
            oPlan.Date = uPlan.Date;
            oPlan.Data = uPlan.Data;
            context.SaveChanges();

            return Ok(oPlan);
        }
    }
}
