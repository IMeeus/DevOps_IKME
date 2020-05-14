import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  error:string = "";

  constructor(
    private authSvc: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  async signIn() {
    this.authSvc.SignIn(this.email, this.password)
    .then(user => {
      this.router.navigate(['/home']);
    })
    .catch(err => {
      this.error = err.message;
    });
  }
}