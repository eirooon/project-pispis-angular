import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService : AuthService) { }

  ngOnInit() {
  }
  
  onSignup( form : NgForm ) {
    const email = form.value.email;
    const password = form.value.password;
    console.log(email);
    this.authService.signupUser(email, password);
  }

}
