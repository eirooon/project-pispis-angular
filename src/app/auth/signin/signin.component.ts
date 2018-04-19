import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../../shared/service/auth.service';
import { NgProgress } from 'ngx-progressbar';
import * as firebase from "firebase";

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

  error: { name: string, message: string } = { name: '', message: '' };
  hasError: boolean = false;
  showSpinner: boolean = true;

  constructor( 
    private router: Router, 
    public authService: AuthService,
    private ngProgress: NgProgress){

   }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    this.ngProgress.start();
    this.authService
        .signinUser(form.value.email, form.value.password)
        .then(() => {
          this.ngProgress.done();
          this.hasError = false;
          this.uid = this.authService.getUidOfCurrentDoctor();
          localStorage.setItem("UID", this.uid);
          this.router.navigate(['/home']);
        })
        .catch(_error => {
          this.ngProgress.done();
          this.error = _error
          this.hasError = true;
          console.log("Error from sign in component: " + this.error.message);
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
