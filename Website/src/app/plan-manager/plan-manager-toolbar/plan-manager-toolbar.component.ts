import { Component, OnInit, HostListener } from '@angular/core';
import { PlanManagerService } from '../plan-manager.service';
import { FuelApiService } from '@services/fuel-api.service';
import { PlanApiService } from '@services/plan-api.service';

@Component({
  selector: 'app-plan-manager-toolbar',
  templateUrl: './plan-manager-toolbar.component.html',
  styleUrls: ['./plan-manager-toolbar.component.css']
})
export class PlanManagerToolbarComponent implements OnInit {
  handler: StripeCheckoutHandler;

  constructor(
    private localSvc: PlanManagerService,
    private fuelSvc: FuelApiService,
    private planApiSvc: PlanApiService
  ) { }

  async ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: "pk_test_KRRKTCBkHTjZB53ahTJAmQW900sRouSADW",
      locale: 'auto',
      source: this.validatePayment
    });
  }

  async checkout(e: Event) {
    this.handler.open({
      name: 'IKME Checkout',
      description: "",
      amount: this.TotalPrice * 100,
      email: "alexanderm@hotmail.be"
    });
    e.preventDefault();
  }

  @HostListener('window.popstate')
  onPopstate() {
    this.handler.close;
  }

  private async validatePayment(source: any) {
    // TODO
  }

  savePlan() {
    let plan = {
      id: this.localSvc.activePlan.Id,
      name: this.localSvc.activePlan.Name,
      date: this.localSvc.activePlan.Date,
      data: this.localSvc.activePlan.Data
    };

    this.planApiSvc.UpdatePlan(plan).subscribe();
  }

  get TotalPrice() {
    let totalSunPrice = this.localSvc.activePlan.TotalSun * this.localSvc.fuels[0].price;
    let totalWindPrice = this.localSvc.activePlan.TotalWind * this.localSvc.fuels[1].price;
    let totalNuclearPrice = this.localSvc.activePlan.TotalNuclear * this.localSvc.fuels[2].price;
    let totalBiomassPrice = this.localSvc.activePlan.TotalBiomass * this.localSvc.fuels[3].price;
    let totalStegPrice = this.localSvc.activePlan.TotalSteg * this.localSvc.fuels[4].price;

    return totalSunPrice + totalWindPrice + totalNuclearPrice + totalBiomassPrice + totalStegPrice;
  }
}
