import { Component, OnInit } from '@angular/core';
import { PlanApiService, ApiPlan } from '@services/plan-api.service';

@Component({
  selector: 'app-ikme-api-read',
  templateUrl: './ikme-api-read.component.html',
  styleUrls: ['./ikme-api-read.component.css']
})
export class IkmeApiReadComponent implements OnInit {
  inputId: number;

  plans: ApiPlan[];

  constructor(private planApiSvc: PlanApiService) { }

  ngOnInit() {
    this.LoadAllPlans();
  }

  LoadAllPlans() {
    this.planApiSvc.GetAllPlans().subscribe(result => {
      this.plans = result;
    })
  }

  get InputId() {
    return this.inputId;
  }

  set InputId(value: number) {
    if (value.toString() == '') {
      this.LoadAllPlans();
      return;
    }

    this.inputId = value;
    this.planApiSvc.GetPlan(value).subscribe(
      result => {
        this.plans = [result];
        console.log(this.plans);
      },
      error => {
        this.plans = [];
      })
  }
}