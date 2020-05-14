import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-ikme-api',
  templateUrl: './ikme-api.component.html',
  styleUrls: ['./ikme-api.component.css']
})
export class IkmeApiComponent implements OnInit {
  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

  click() {
    this.authSvc.GetCurrentUserData().then(user => {
      console.log(user);
    })
  }
}
