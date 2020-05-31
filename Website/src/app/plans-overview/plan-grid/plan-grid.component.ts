import { Component, OnInit } from '@angular/core';
import { ApiPlan } from '@services/plan-api.service';
import { PlansOverviewService } from '../plans-overview.service';

@Component({
  selector: 'app-plan-grid',
  templateUrl: './plan-grid.component.html',
  styleUrls: ['./plan-grid.component.css']
})
export class PlanGridComponent implements OnInit {
  plans: ApiPlan[] = [];

  constructor(private planService: PlansOverviewService) {
  }

  ngOnInit() {
  }

  get Plans(){
    return this.planService.plans;
  }
}