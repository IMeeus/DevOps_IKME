import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-plans',
  templateUrl: './recent-plans.component.html',
  styleUrls: ['./recent-plans.component.css']
})
export class RecentPlansComponent implements OnInit {
  plans: TestPlan[];

  constructor() {
    this.plans = new Array<TestPlan>(10);
    for (let i = 1; i <= 10; i++) {
      this.plans.push(new TestPlan(`Plan${i}`, new Date() ))
    }
  }

  ngOnInit() {
  }
}

class TestPlan {
  name: string;
  date: Date;

  constructor(name: string, date:Date) {
    this.name = name;
    this.date = date;  
  }
}