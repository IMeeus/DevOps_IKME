import { Component, HostListener } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  contentStyle: any;

  constructor(
    private authSvc: AuthService
  ) { 
    this.GetScreenHeight();
   }

   @HostListener('window:resize', ['$event'])
   GetScreenHeight(event?: Event) {
     this.contentStyle = {
       'height': `${window.innerHeight - 100}px`,
       'padding': '20px'
     };
   }

   async SignOut() {
     await this.authSvc.SignOut();
   }
}
