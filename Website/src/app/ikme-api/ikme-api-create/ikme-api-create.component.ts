import { Component, OnInit } from '@angular/core';
import { PlanApiService, QuarterData, ApiPlan } from '@services/plan-api.service';

@Component({
  selector: 'app-ikme-api-create',
  templateUrl: './ikme-api-create.component.html',
  styleUrls: ['./ikme-api-create.component.css']
})
export class IkmeApiCreateComponent implements OnInit {
  selectedFile: File;
  planToCreate: ApiPlan;

  constructor(private planApiSvc: PlanApiService) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      let planData: QuarterData[] = JSON.parse(fileReader.result as string);
      this.planToCreate = {
        id: null,
        name: "Created Test",
        date: new Date(),
        data: planData
      }
    }
    fileReader.onerror = () => {
      console.log(fileReader.error);
    }
  }

  onUpload() {
    this.planApiSvc.CreatePlan(this.planToCreate).subscribe(
      result => {
        console.log("Succesfully Created.");
      },
      error => {
        console.log("Create failed.");
      }
    );
  }
}
