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
  error: { name: string, message: string } = { name: '', message: '' };
  
  passwordType: string = 'password';
  passwordShown: boolean = false;
  iconStyle: string = "mdi mdi-eye";

  hasError: boolean = false;

  constructor( 
    private router: Router, 
    public authService: AuthService){

   }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    this.authService
      .signinUser(form.value.email, form.value.password)
<<<<<<< Updated upstream
      .then(() => {
        this.hasError = false;
        this.router.navigate(['/home']);
      })
      .catch(_error => {
        this.error = _error
        this.hasError = true;
        console.log("Error from sign in component: " + this.error.message);
      })
=======
      .subscribe(
        data =>  {
          if(data!=null || data!=undefined){
              this.hasError = false; 
              console.log("Successful sign in" + data);
              this.uid = this.authService.getUidOfCurrentDoctor();
              localStorage.setItem("UID", this.uid);
              this.router.navigate(['/home']); //if successfuly logged-in, redirect to Home page,
          }
          else{
            console.log("Error sign in" + data);
            this.hasError = true; 
          }
        },
        error => {
          console.log("Error signin 2: ", error);
          this.hasError = true; 
        },
        ()  =>  console.log("Finished")
    );
>>>>>>> Stashed changes
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
