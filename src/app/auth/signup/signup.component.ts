import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../../shared/service/auth.service';
import { DoctorService } from '../../shared/service/doctor.service';
import { Logger } from '../../shared/service/logger.service';
import { NgProgress } from 'ngx-progressbar';
import { Doctor } from '../../shared/models/doctorModel';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;

  doctor: Doctor;
  passwordType: string = 'password';
  passwordShown: boolean = false;
  iconStyle: string = "mdi mdi-eye";

  error: { name: string, message: string } = { name: '', message: '' };
  hasError: boolean = false;

  constructor(
    public authService: AuthService,
    public docService: DoctorService,
    private router: Router,
    private ngProgress: NgProgress,
    private logger: Logger
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
   * Description: Execute upon sign up
   * @param form 
   * @return void
   */
  onSignup(form: NgForm) {
    this.ngProgress.start();
    this.authService.signupUser(form.value.email, form.value.password)
      .then(res => {
        //Set doctor info
        this.doctor = {
          uid: res.uid,
          email: form.value.email,
          name: form.value.email.substring(0, form.value.email.lastIndexOf("@")),
          professionalRate: 0,
          middlename: '',
          lastname: '',
          birthdate: '',
          contact: 0,
          address: '',
        }
        this.docService.addDoctor(this.doctor);
        this.ngProgress.done();
        this.hasError = false;
        this.router.navigate(['/home']);
      })
      .catch(_error => {
        this.ngProgress.done();
        this.error = _error
        this.hasError = true;
        this.logger.error(this.CLASSNAME, "onSignup", "Error: " + this.error.message);
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
