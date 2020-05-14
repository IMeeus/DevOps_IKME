import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = {email: "", name: "", firstname: "", company: "", adres: "", postalcode: "", creditcard: "", cvc: ""};

  password: string = "";
  error: string = "";

  constructor(
    private authSvc: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  get buttonDisabled(): boolean {
    return this.user.email == "" || this.password == "";
  }

  async signUp() {


    await this.authSvc.SignUp(this.user, this.password)
    .then(resolve => {
      this.router.navigate(['/login'])
      this.authSvc.SignOut();
    })
    .catch(reject => {
      this.error = reject;
    })
  }
}
