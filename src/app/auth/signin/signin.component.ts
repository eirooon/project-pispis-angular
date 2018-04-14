import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm }   from '@angular/forms';
import { Router } from "@angular/router";
// import { auth } from 'firebase/app';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {

  result: string;
  hasError: boolean; 
  uid: string;

  constructor( 
    private router: Router, 
    private authService: AuthService
  ){
    authService.signInIndicator$.subscribe(
     resultToken => {
            this.result = resultToken;
            console.log.apply("Result" + this.result);
     })
   }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    this.authService
      .signinUser(form.value.email, form.value.password)
      .subscribe(
        data =>  {
          if(data!=null || data!=undefined){
              this.hasError = false; 
              console.log("Successful sign in" + data);
              this.uid = this.authService.getUidOfCurrentDoctor();
              this.router.navigate(['/home']); //if successfuly logged-in, redirect to Home page,
          }
          else
            console.log("Error signin");
            this.hasError = true; 
          },
        error => {
          this.hasError = error; 
        },
        ()  =>  console.log("Finished")
    );
  }
}
