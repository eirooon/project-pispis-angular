import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm }   from '@angular/forms';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {

  result: string;
  constructor( private router: Router, private authService: AuthService) {
    authService.signInIndicator$.subscribe(
     resultToken => {
            this.result = resultToken;
            console.log.apply("Result" + this.result);
     })
   }

  ngOnInit() {
  }

  onSignin(form : NgForm){

    form.form.controls['email'].setErrors(null);
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password)
    .subscribe(
      data =>   console.log(data), //if successfuly logged-in, redirect to Home page,
      // error => {
      //   form.form.controls['email'].markAsTouched();
      //    console.log(error);
      // },
      // ()  =>  console.log("Finished")
    );
  }
}
