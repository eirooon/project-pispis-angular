import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(public authService : AuthService) { }

  ngOnInit() {
  }
  
  onSignup( form : NgForm ) {
    const email = form.value.email;
    const password = form.value.password;
    console.log(email);
    this.authService.signupUser(email, password);
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
}
