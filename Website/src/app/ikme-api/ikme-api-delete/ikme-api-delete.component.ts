import { Component, OnInit } from '@angular/core';
import { PlanApiService } from '@services/plan-api.service';

@Component({
  selector: 'app-ikme-api-delete',
  templateUrl: './ikme-api-delete.component.html',
  styleUrls: ['./ikme-api-delete.component.css']
})
export class IkmeApiDeleteComponent implements OnInit {
  inputId: number;
  disableDelete: boolean = true;

  constructor(private planApiSvc: PlanApiService) { }

  ngOnInit() {
  }

  get InputId() {
    return this.inputId;
  }

  set InputId(value: number) {
    this.disableDelete = value.toString() == '';
    this.inputId = value;
  }

  DeletePlan() {
    this.planApiSvc.DeletePlan(this.inputId).subscribe();
  }
}