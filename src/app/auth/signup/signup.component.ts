import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  passwordType: string = 'password';
  passwordShown: boolean = false;
  iconStyle: string = "mdi mdi-eye";
  
  error: { name: string, message: string } = { name: '', message: '' };
  hasError: boolean = false;

  constructor(
    public authService : AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  
  onSignup( form : NgForm ) {
    console.log(form.value.email);
    this.authService.signupUser(form.value.email, form.value.password)
    .then(() => {
      this.hasError = false;
      this.router.navigate(['/home']);
    })
    .catch(_error => {
      this.error = _error
      this.hasError = true;
      console.log("Error from sign up component: " + this.error.message);
    })
  }

  togglePassword(){
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
      this.iconStyle = "mdi mdi-eye";
    }else{
      this.passwordShown = true;
      this.passwordType = 'text';
      this.iconStyle = "mdi mdi-eye-off";
    }
  }

  closeErrorBar(){
    this.hasError = false;
  }

}
