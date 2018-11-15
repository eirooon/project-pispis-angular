import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Doctor } from '../../../shared/models/doctorModel';
import { DoctorService } from '../../../shared/service/doctor.service';
import { Logger } from '../../../shared/service/logger.service';
import { _do } from 'rxjs/operator/do';

@Component({
  selector: 'app-doctors-profile',
  templateUrl: './doctors-profile.component.html',
  styleUrls: ['./doctors-profile.component.css']
})
export class DoctorsProfileComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;
  doctors: Doctor[];
  doctor: Doctor;

  constructor(
    private location: Location,
    private docService: DoctorService,
    private logger: Logger,
    private router: Router
  ) { }

  profileForm = new FormGroup({
    firstname: new FormControl(""),
    middlename: new FormControl(""),
    lastname: new FormControl(""),
    birthdate: new FormControl(""),
    contact: new FormControl(""),
    address: new FormControl(""),
    email: new FormControl(""),
    specialty: new FormControl("", Validators.required),
  })

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.doctor = {
      id: localStorage.getItem("UID"),
      name: '',
      email: '',
      professionalRate: 0,
      middlename: '',
      lastname: '',
      birthdate: '',
      contact: 0,
      address: ''
    }
    this.loadDoctor();

  }

  /**
   * Method: loadDoctor
   * Description: Load doctor
   * @return void
   */
  loadDoctor() {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Doctor: " + this.docService.getDoctor());
    this.docService.getDoctor().subscribe(ret => {
      setTimeout(() => {
        this.setDoctor(ret[0]);
      }, 500);
      this.logger.info(this.CLASSNAME, "ngOnInit", "Ret: " + ret);
      this.doctors = ret;
    });
  }

  /**
   * Method: setDoctor
   * Description: Set doctor
   * @param _doc 
   * @return void
   */
  setDoctor(_doc: Doctor) {
    // this.doctor = {
    //   name: _doc.name,
    //   email: _doc.email,
    //   professionalRate: _doc.professionalRate,
    // }
    this.profileForm.setValue({
      firstname: _doc.name,
      middlename: _doc.middlename,
      lastname: _doc.lastname,
      birthdate: _doc.birthdate,
      contact: _doc.contact,
      address: _doc.address,
      email: _doc.email,
      specialty: _doc.professionalRate,
    });

  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    this.location.back();
  }

  updateProfile(){

    if(this.profileForm.valid){
      // this.doctor.id = localStorage.getItem("UID");
      this.doctor.name = this.profileForm.value.firstname;
      this.doctor.middlename = this.profileForm.value.middlename;
      this.doctor.lastname = this.profileForm.value.lastname;
      this.doctor.birthdate = this.profileForm.value.birthdate;
      this.doctor.contact = this.profileForm.value.contact;
      this.doctor.address = this.profileForm.value.address;
      this.doctor.email = this.profileForm.value.email;
      this.doctor.professionalRate = this.profileForm.value.specialty;

      this.docService.updateDoctor(this.doctor);
      this.logger.info(this.CLASSNAME, "updateProfile", "Doctor ID: [" + this.doctor.id + "] updated done.");
      // console.log(this.consultationText);
      this.router.navigateByUrl('/account-settings');
    } else {
      this.logger.error(this.CLASSNAME, "updateProfile", "Error: Form is invalid");
    }

  }
}
