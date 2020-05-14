import { Component, OnInit, ElementRef } from '@angular/core';
import { PlanManagerService } from '../plan-manager.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-plan-overview',
  templateUrl: './plan-overview.component.html',
  styleUrls: ['./plan-overview.component.css']
})
export class PlanOverviewComponent implements OnInit {
  
  constructor(
    private elementRef: ElementRef,
    private localSvc: PlanManagerService) { }

  ngOnInit() {
    this.CreateFuelChart();
  }

  CreateFuelChart() {
    let ref = this.elementRef.nativeElement.querySelector("#fuel-chart");

    let sunData = this.localSvc.activePlan.Data.map(res => res.sun);
    let windData = this.localSvc.activePlan.Data.map(res => res.wind);
    let nuclearData = this.localSvc.activePlan.Data.map(res => res.nuclear);
    let biomassaData = this.localSvc.activePlan.Data.map(res => res.biomassa);
    let stegData = this.localSvc.activePlan.Data.map(res => res.steg);

    let barWidth = 25;

    this.localSvc.planChart = new Chart(ref, {
      type: 'bar',
      data: {
        labels: this.localSvc.timeLabels,
        datasets: [
          {
            label: 'Sun',
            data: sunData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            barThickness: barWidth
          },
          {
            label: 'Wind',
            data: windData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            barThickness: barWidth
          },
          {
            label: 'Nuclear',
            data: nuclearData,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            barThickness: barWidth
          },
          {
            label: 'Biomassa',
            data: biomassaData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            barThickness: barWidth
          },
          {
            label: 'STEG',
            data: stegData,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            barThickness: barWidth
          }]
      },
      options: {
        responsive: false,
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        },
        legend: {
          fullWidth: true
        }
      }
    });
  }
}