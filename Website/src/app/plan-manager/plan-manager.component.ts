import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PlanManagerService } from './plan-manager.service';
import { PlanApiService, QuarterData } from '@services/plan-api.service';
import { Plan } from './model/Plan';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { FuelApiService } from '@services/fuel-api.service';

@Component({
  selector: 'app-plan-manager',
  templateUrl: './plan-manager.component.html',
  styleUrls: ['./plan-manager.component.css']
})
export class PlanManagerComponent implements OnInit {

  dateTime: Date= new Date(2020,5,29,0,0);

  constructor(
    private cookieSvc: CookieService,
    private localSvc: PlanManagerService,
    private planApiSvc: PlanApiService,
    private fuelApiSvc: FuelApiService
  ) { }

  ngOnInit() {
    this.loadTimeLabels();
    this.loadPlan(parseInt(this.cookieSvc.get('active-plan-id')));
    this.loadFuels();
  }

  private loadTimeLabels() {
    this.localSvc.timeLabels = [];
    for (let i = 0; i < 96; i++) {
      let temp = i * 15;
      let hh = Math.floor(temp / 60).toString();
      while(hh.length < 2) hh = '0' + hh;
      let mm = (temp % 60).toString();
      while(mm.length < 2) mm = '0' + mm;
      this.localSvc.timeLabels.push(`${hh}:${mm}`);
    }
  }

  private loadPlan(id: number) {
    this.planApiSvc.GetPlan(id).subscribe(
      (res) => {
        this.localSvc.activePlan = new Plan(res.id, res.name, res.date, res.data);
      }
    )
  }

  private async loadFuels() {
    this.localSvc.fuels = await this.fuelApiSvc.GetFuels();
  }

  get date():Date{
    return this.dateTime;
  }
  set date(newTime:Date){
    this.dateTime=newTime;
    this.localSvc.activeQuarterIndex=this.DateToIndex(newTime);
  }

  DateToIndex(date:Date){
    let index=date.getHours();
    index*=60;
    index+= date.getMinutes();
    return index/15
  }
}
