import { Component, OnInit } from '@angular/core';
import { PlanManagerService } from '../plan-manager.service';


@Component({
  selector: 'app-quarter-editor',
  templateUrl: './quarter-editor.component.html',
  styleUrls: ['./quarter-editor.component.css'],
})
export class QuarterEditorComponent implements OnInit {

  Tooltip:string;
  constructor(private localSvc: PlanManagerService) {
   }

  ngOnInit(
    Tooltip="Test tooltip"
  ) {
  }
  
  ChartDataChange(type:number,newValue:number){
    this.localSvc.planChart.data.datasets[type].data[this.localSvc.activeQuarterIndex]=newValue;
    this.localSvc.planChart.update()
    this.localSvc.activePlan.updateError(this.localSvc.activeQuarterIndex);
  }

  TotalChange(newValue:number){
    this.localSvc.activePlan.SetTotal(this.localSvc.activeQuarterIndex,newValue)
  }
}