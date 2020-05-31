import { Component, OnInit, ElementRef } from '@angular/core';
import { FuelApiService } from '@services/fuel-api.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-fuel-capacity',
  templateUrl: './fuel-capacity.component.html',
  styleUrls: ['./fuel-capacity.component.css']
})
export class FuelCapacityComponent implements OnInit {
  tableData: TableData[];
  capacityChart: Chart;

  constructor(
    private elementRef: ElementRef,
    private fuelApiSvc: FuelApiService) { }

  async ngOnInit() {
    await this.loadTableData().then(res => this.tableData = res);
    await this.loadCapacityChart().then(res => this.capacityChart = res);
  }

  private async loadTableData(): Promise<TableData[]> {
    let fuels = await this.fuelApiSvc.GetFuels();

    return new Promise((resolve) => {
      let tableData: TableData[] = [];
      let labels = ['Zon', 'Wind', 'Kern', 'Biomassa', 'Steg']
      for (let i = 0; i < fuels.length; i++) {
        tableData.push({
          fuelType: labels[i],
          capacity: fuels[i].capacity
        });
      };
      resolve(tableData);
    });
  }

  private async loadCapacityChart(): Promise<Chart> {
    let fuels = await this.fuelApiSvc.GetFuels();

    return new Promise((resolve) => {
      let ref = this.elementRef.nativeElement.querySelector("#capacity-chart");
      let chart = new Chart(ref, {
        type: 'doughnut',
        data: {
          labels: ['Zon', 'Wind', 'Kern', 'Biomassa', 'Steg'],
          datasets: [
            {
              data: [
                fuels[0].capacity,
                fuels[1].capacity,
                fuels[2].capacity,
                fuels[3].capacity,
                fuels[4].capacity],
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
  fuelType: string,
  capacity: number
}
