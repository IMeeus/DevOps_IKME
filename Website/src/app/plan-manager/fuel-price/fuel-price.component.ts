import { Component, OnInit, ElementRef } from '@angular/core';
import { PlanManagerService } from '../plan-manager.service';
import { FuelApiService } from '@services/fuel-api.service';
import { Chart } from 'chart.js';
import * as math from 'mathjs';

declare var StripeCheckout: StripeCheckoutStatic;

@Component({
  selector: 'app-fuel-price',
  templateUrl: './fuel-price.component.html',
  styleUrls: ['./fuel-price.component.css']
})
export class FuelPriceComponent implements OnInit {
  tableData: TableData[];
  priceChart: Chart;

  constructor(
    private elementRef: ElementRef,
    private localSvc: PlanManagerService,
    private fuelSvc: FuelApiService
  ) { }

  async ngOnInit() {
    await this.loadTableData().then(res => this.tableData = res);
    await this.loadPriceChart().then(res => this.priceChart = res);
  }

  private async loadTableData(): Promise<TableData[]> {
    let fuels = await this.fuelSvc.GetFuels();

    return new Promise<TableData[]>((resolve, reject) => {
      let tableData: TableData[] = []

      let sunPricePerKw = fuels[0].price;
      let sunTotalKw = this.localSvc.activePlan.TotalSun;
      let sunTotalPrice = sunPricePerKw * sunTotalKw;
      let sunData = new TableData('Zon', sunPricePerKw, sunTotalKw, sunTotalPrice);
      tableData.push(sunData);

      let windPricePerKw = fuels[1].price;
      let windTotalKw = this.localSvc.activePlan.TotalWind;
      let windTotalPrice = windPricePerKw * windTotalKw;
      let windData = new TableData('Wind', windPricePerKw, windTotalKw, windTotalPrice);
      tableData.push(windData);

      let nuclearPricePerKw = fuels[2].price;
      let nuclearTotalKw = this.localSvc.activePlan.TotalNuclear;
      let nuclearTotalPrice = nuclearPricePerKw * nuclearTotalKw;
      let nuclearData = new TableData('Kern', nuclearPricePerKw, nuclearTotalKw, nuclearTotalPrice);
      tableData.push(nuclearData);

      let biomassaPricePerKw = fuels[3].price;
      let biomassaTotalKw = math.sum(this.localSvc.activePlan.Data.map(res => res.biomassa));
      let biomassaTotalPrice = biomassaPricePerKw * biomassaTotalKw;
      let biomassaData = new TableData('Biomassa', biomassaPricePerKw, biomassaTotalKw, biomassaTotalPrice);
      tableData.push(biomassaData);

      let stegPricePerKw = fuels[4].price;
      let stegTotalKw = this.localSvc.activePlan.TotalSteg
      let stegTotalPrice = stegPricePerKw * stegTotalKw;
      let stegData = new TableData('Steg', stegPricePerKw, stegTotalKw, stegTotalPrice);
      tableData.push(stegData);

      resolve(tableData);
    })
  }

  private async loadPriceChart(): Promise<Chart> {
    let fuels = await this.fuelSvc.GetFuels();

    return new Promise((resolve, reject) => {
      let ref = this.elementRef.nativeElement.querySelector("#price-chart");

      let chart = new Chart(ref, {
        type: 'horizontalBar',
        data: {
          labels: ['Zon', 'Wind', 'Kern', 'Biomassa', 'Steg'],
          datasets: [{
            data: [
              fuels[0].price,
              fuels[1].price,
              fuels[2].price,
              fuels[3].price,
              fuels[4].price],
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
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
      resolve(chart);
    });
  }
}

class TableData {
  fuelType: string;
  pricePerKw: number;
  totalKw: number;
  totalPrice: number;

  constructor(fuelType: string, pricePerKw: number, totalKw: number, totalPrice: number) {
    this.fuelType = fuelType,
      this.pricePerKw = pricePerKw,
      this.totalKw = totalKw,
      this.totalPrice = totalPrice
  }
}