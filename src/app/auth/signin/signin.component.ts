import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../../shared/service/auth.service';
import { Logger } from '../../shared/service/logger.service';
import { NgProgress } from 'ngx-progressbar';
import * as firebase from "firebase";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;

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
    private ngProgress: NgProgress,
    private logger: Logger,
  ) {

  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
  }

  /**
   * Method: onSignin
   * Description: Execute upon sign in
   * @param form 
   * @return void
   */
  onSignin(form: NgForm) {
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
        this.logger.error(this.CLASSNAME, "onSignin", "Error: " + this.error.message);
      })
  }

  /**
   * Method: togglePassword
   * Description: Toogle password
   * @return void
   */
  togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
      this.iconStyle = "mdi mdi-eye";
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
      this.iconStyle = "mdi mdi-eye-off";
    }
  }

  /**
   * Method: closeErrorBar
   * Description: Close error bar
   * @return void
   */
  closeErrorBar() {
    this.hasError = false;
  }

}
