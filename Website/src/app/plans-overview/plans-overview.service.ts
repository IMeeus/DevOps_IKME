import { Injectable } from '@angular/core';
import { ApiPlan, PlanApiService } from '@services/plan-api.service';

@Injectable({
  providedIn: 'root'
})
export class PlansOverviewService {
  public plans: ApiPlan[] = null;
  private searchName: string;
  
  constructor(private planApiSvc: PlanApiService) { }

  LoadPlans() {
    this.plans = [];
    this.planApiSvc.GetAllPlans(this.searchName).subscribe(
      res => this.plans = res
    );
  }

  get SearchName(){
    return this.searchName;
  }

  set SearchName(value: string){
    this.searchName = value;
    this.LoadPlans();
  }
}
