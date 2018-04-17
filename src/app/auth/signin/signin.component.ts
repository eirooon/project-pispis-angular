import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm }   from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {

  uid: string;

  passwordType: string = 'password';
  passwordShown: boolean = false;
  iconStyle: string = "mdi mdi-eye";

  constructor( 
    private router: Router, 
    private authService: AuthService){

   }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    this.authService
      .signinUser(form.value.email, form.value.password);
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
