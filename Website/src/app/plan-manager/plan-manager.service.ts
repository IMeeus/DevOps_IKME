import { Injectable } from '@angular/core';
import { Plan } from './model/Plan';
import { Fuel } from '@services/fuel-api.service';

@Injectable({
  providedIn: 'root'
})
export class PlanManagerService {
  public activeQuarterIndex = 0;
  public activePlan: Plan;
  public timeLabels: string[];
  public fuels: Fuel[];
  public planChart: Chart;

  constructor() { }

  get ActiveQuarter() {
    return this.activePlan.Data[this.activeQuarterIndex];
  }

  public NextQuarter() {
    this.activeQuarterIndex++;
  }

  public PrevQuarter() {
    this.activeQuarterIndex--;
  }
}
