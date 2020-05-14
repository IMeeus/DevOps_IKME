import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PlansOverviewService } from './plans-overview.service';
import { QuarterData, PlanApiService, ApiPlan } from '@services/plan-api.service';
import readXlsxFile from 'read-excel-file';

@Component({
  selector: 'app-plans-overview',
  templateUrl: './plans-overview.component.html',
  styleUrls: ['./plans-overview.component.css']
})
export class PlansOverviewComponent implements OnInit {
  display: boolean = false;

  constructor(private router: Router,
    private cookieSvc: CookieService,
    private localSvc: PlansOverviewService,
    private planApiSvc: PlanApiService
    ) { }

  ngOnInit() {
    this.localSvc.LoadPlans();
  }

  ShowDialog() {
    this.display = true;
  }

  OpenNewPlan() {
    let emptyData: QuarterData[] = [];
    let emptyDataObject: QuarterData = { total: 0, sun: 0, wind: 0, nuclear: 0, biomassa: 0, steg: 0, error: 0};
    for (let i = 0; i < 96; i++) emptyData.push(emptyDataObject);

    let newPlan: ApiPlan = {
      name: "new plan",
      date: new Date(),
      data: emptyData
    };

    this.planApiSvc.CreatePlan(newPlan).subscribe(res => {
      this.cookieSvc.set("active-plan-id", res.id.toString());
      this.router.navigate(['/plan-manager']);
    });
  }

  async OpenExcelPlan(event: any){
    let file = event.target.files[0];
    let newData: QuarterData[] = [];
    await readXlsxFile(file).then((rows: any) => {
      for(let i = 1; i < rows.length; i++){
        let newDataObject: QuarterData = {
          total: rows[i][0],
          sun: rows[i][1],
          wind: rows[i][2],
          nuclear: rows[i][3],
          biomassa: rows[i][4],
          steg: rows[i][5],
          error: rows[i][6]
        };
        newData.push(newDataObject);  
      }
    });

    let newPlan: ApiPlan = {
      name: "new excel plan",
      date: new Date(),
      data: newData
    };

    this.planApiSvc.CreatePlan(newPlan).subscribe(res => {
      this.cookieSvc.set("active-plan-id", res.id.toString());
      this.router.navigate(['/plan-manager']);
    });
  }

  get SearchName() {
    return this.localSvc.SearchName;
  }

  set SearchName(value: string) {
    this.localSvc.SearchName = value;
  }
}

