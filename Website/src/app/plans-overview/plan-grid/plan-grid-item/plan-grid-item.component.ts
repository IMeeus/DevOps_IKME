import { Component, OnInit, Input } from '@angular/core';
import { ApiPlan } from '@services/plan-api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-plan-grid-item',
  templateUrl: './plan-grid-item.component.html',
  styleUrls: ['./plan-grid-item.component.css'],
})
export class PlanGridItemComponent implements OnInit {
  @Input("plan") plan: ApiPlan = null;

  name: string;
  date: Date;

  constructor(
    private router: Router,
    private cookieSvc: CookieService) { }

  ngOnInit() {
    this.name = this.plan.name;
    this.date = this.plan.date;
  }

  ShowPlan() {
    this.cookieSvc.set('active-plan-id', this.plan.id.toString());
    this.router.navigateByUrl('/plan-manager');
  }
}