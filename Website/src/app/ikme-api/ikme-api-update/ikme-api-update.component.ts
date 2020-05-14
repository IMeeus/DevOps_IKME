import { Component, OnInit } from '@angular/core';
import { ApiPlan, QuarterData, PlanApiService } from '@services/plan-api.service';

@Component({
  selector: 'app-ikme-api-update',
  templateUrl: './ikme-api-update.component.html',
  styleUrls: ['./ikme-api-update.component.css']
})
export class IkmeApiUpdateComponent implements OnInit {
  inputId: number;
  selectedFile: File;
  planToUpdate: ApiPlan;
  disableSelectFile: boolean = true;

  constructor(private planApiSvc: PlanApiService) { }

  ngOnInit() {
  }

  get InputId(): number {
    return this.inputId;
  }

  set InputId(value: number) {
    this.disableSelectFile = value.toString() == '';
    this.inputId = value;
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      let planData: QuarterData[] = JSON.parse(fileReader.result as string);
      this.planToUpdate = {
        id: this.inputId,
        name: "test",
        date: new Date(),
        data: planData
      }
    }
    fileReader.onerror = () => {
      console.log(fileReader.error);
    }
  }

  onUpload() {
    this.planApiSvc.UpdatePlan(this.planToUpdate).subscribe(
      result => {
        console.log("Succesfully updated.");
      },
      error => {
        console.log("Update failed.");
      }
    );
  }
}
