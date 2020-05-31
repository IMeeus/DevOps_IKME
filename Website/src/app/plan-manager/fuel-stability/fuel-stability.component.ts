import { Component, OnInit, ElementRef } from '@angular/core';
import { FuelApiService } from '@services/fuel-api.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-fuel-stability',
  templateUrl: './fuel-stability.component.html',
  styleUrls: ['./fuel-stability.component.css']
})
export class FuelStabilityComponent implements OnInit {
  tableData: TableData[];
  stabilityChart: Chart;

  constructor(
    private elementRef: ElementRef,
    private fuelApiSvc: FuelApiService) { }

  async ngOnInit() {
    await this.loadTableData().then(res => this.tableData = res);
    await this.loadStabilityChart().then(res => this.stabilityChart = res);
  }

  private async loadTableData(): Promise<TableData[]> {
    let fuels = await this.fuelApiSvc.GetFuels();

    return new Promise(resolve => {
      let tableData: TableData[] = [];
      let labels = ['Zon', 'Wind', 'Kern', 'Biomassa', 'Steg']
      for (let i = 0; i < fuels.length; i++) {
        tableData.push({
          fuelType: labels[i],
          stability: fuels[i].stability * 100
        });
      };
      resolve(tableData);
    });
  }

  private async loadStabilityChart(): Promise<Chart> {
    let fuels = await this.fuelApiSvc.GetFuels();

    return new Promise(resolve => {
      let ref = this.elementRef.nativeElement.querySelector("#stability-chart");
      let chart = new Chart(ref, {
        type: 'pie',
        data: {
          labels: ['Zon', 'Wind', 'Kern', 'Biomassa', 'Steg'],
          datasets: [
            {
              data: [
                fuels[0].stability,
                fuels[1].stability,
                fuels[2].stability,
                fuels[3].stability,
                fuels[4].stability],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)']
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'left'
          }
        }
      });
      resolve(chart);
    });
  }
}

interface TableData {
  fuelType: string;
  stability: number;
}
