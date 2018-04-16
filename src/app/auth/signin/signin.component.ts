import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {

  result: string;
  hasError: boolean; 
  uid: string;

  passwordType: string = 'password';
  passwordShown: boolean = false;
  iconStyle: string = "mdi mdi-eye";

  form = new FormGroup({
    username: new FormControl('',[ 
          Validators.required,
          Validators.minLength(5)
        ]),
    password: new FormControl('', Validators.required)
  });

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

  getUserName(){
    return this.form.get('username');
  }
  ngOnInit() {
  }

  onSignin(){
    this.authService
      .signinUser(username, form.password)
      .subscribe(
        data =>  {
          if(data!=null || data!=undefined){
              this.hasError = false; 
              console.log("Successful sign in" + data);
              this.uid = this.authService.getUidOfCurrentDoctor();
              this.router.navigate(['/home']); //if successfuly logged-in, redirect to Home page,
          }
          else{
            console.log("Error signin");
            this.hasError = true; 
          }
        },
        error => {
          console.log("Error signin 2: ", error);
          this.hasError = true; 
        },
        ()  =>  console.log("Finished")
    );
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
