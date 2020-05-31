import { Component, OnInit } from '@angular/core'; 
import { MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { IkmeEliadataService } from '@services/ikme-eliadata.service';
import { PlanManagerService } from '@app/plan-manager/plan-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  // grafiek data
  data: any;
  available: any;
  eliaData:any;
  temp:VermogenVerdeling;

  // gallery 
  images: any[];

  photoUrl: string = "../../assets/windmolens.jpg";

  constructor(private Verbruiksvc: PlanManagerService, private messageService: MessageService, private eliaService:IkmeEliadataService, private dialog: MatDialog) {
    this.temp={kern:0,wind:0,zon:0,steg:0,gas:0,totaal:0}
     
  }
    
  ngOnInit() {
    this.loadTimeLabels();
      this.images = [];
      this.images.push({source:'assets/windmolens2.jpg', alt:'', title:'Windmolens'});
      this.images.push({source:'assets/zonnepanelen.jpg', alt:'', title:'Zonnepanelen'});
      this.images.push({source:'assets/kerncentrale.jpg', alt:'', title:'Kerncentrale'});
      this.images.push({source:'assets/gas.jpg', alt:'', title:'Gas Energy'});

      this.available={
        labels: this.Verbruiksvc.timeLabels,
        datasets:[
          {
            label: 'Kern',
            borderColor:'	#FF0000',
            data: this.eliaService.data.kern,
            fill:false
          },
          {
            label: 'Zon',
            borderColor:'	#00FF00',
            data: this.eliaService.data.zon,
            fill:false
          },
          {
            label: 'Wind',
            borderColor:'	#9400D3',
            data: this.eliaService.data.wind,
            fill:false
          },
          {
            label: 'Gas',
            borderColor:'	#FFFF00',
            data: this.eliaService.data.gas,
            fill:false
          },
          {
            label: 'STEG',
            borderColor:'	#00FFFF',
            data: this.eliaService.data.steg,
            fill:false
          },
        ]
      }
  }

  private loadTimeLabels() {
    this.Verbruiksvc.timeLabels = [];
    for (let i = 0; i < 96; i++) {
      let temp = i * 15;
      let hh = Math.floor(temp / 60).toString();
      while(hh.length < 2) hh = '0' + hh;
      let mm = (temp % 60).toString();
      while(mm.length < 2) mm = '0' + mm;
      this.Verbruiksvc.timeLabels.push(`${hh}:${mm}`);
    }
  } 
}

export interface VermogenVerdeling {
  totaal: number;
  kern: number;
  zon: number;
  wind: number;
  gas: number;
  steg: number;
}