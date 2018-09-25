import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../../shared/models/patient';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../../shared/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/service/validation.service';
import { PatientService } from '../../../shared/service/patient.service';
import { FormsModule } from '@angular/forms';
import { Logger } from '../../../shared/service/logger.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;
  ptnForm: any;
  patient: Patient;
  bmi_val: number;

  ptnCollection: AngularFirestoreCollection<any> = this.afs.collection('patients');
  ptnObserver = this.ptnCollection.valueChanges();

  constructor(
    private location: Location,
    private router: Router,
    private afs: AngularFirestore,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private logger: Logger
  ) {
    this.ngOnInit();
    this.initializePatient();
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.ptnForm = this.formBuilder.group({
      type: ['', Validators.required],
      firstname: ['', Validators.required],
      middlename: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      address: ['', Validators.required],
      occupation: [''],
      landline: [''],
      mobile: ['', [Validators.required, Validators.minLength(11)]],
      email: [''],
      height: [''],
      weight: [''],
      bmi: [''],
      emgy_firstname: ['', Validators.required],
      emgy_lastname: ['', Validators.required],
      emgy_middlename: ['', Validators.required],
      emgy_contact: ['', [Validators.required, Validators.minLength(11)]],
      emgy_email: [''],
      dateAdded: new Date(),
    });
  }

  /**
   * Method: initializePatient
   * Description: Initialize patient model
   * @return void
   */
  initializePatient() {
    this.patient = {
      id: '',
      idDoc: this.authService.getUidOfCurrentDoctor(),
      firstname: '',
      middlename: '',
      lastname: '',
      gender: '',
      birthdate: '',
      address: '',
      occupation: '',
      landline: 0,
      mobile: 0,
      email: '',
      height: '',
      weight: '',
      bmi: '',
      type: '',
      emgy_firstname: '',
      emgy_middlename: '',
      emgy_lastname: '',
      emgy_contact: 0,
      emgy_email: '',
      dateAdded: new Date()
    }
  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    this.location.back();
  }

  /**
   * Method: addPatient
   * Description: Add new patient
   * @return void
   */
  addPatient() {
    //Check for valid inputs
    if (this.ptnForm.valid) {
      this.patientService.addPatient(this.patient);
      this.router.navigateByUrl('/patient');
      this.logger.info(this.CLASSNAME, "ngOnInit", "Patient ID: [" + this.patient.id + "] Adding done");
    } else {
      this.logger.error(this.CLASSNAME, "ngOnInit", "Error: Form is invalid");
    }
  }

  /**
   * Method: calculate
   * Description: Calculate BMI
   * @param event 
   * @return void
   */
  calculate(event: any) {
    // this.bmi_val = +this.patient.weight / ( ( +this.patient.height / 3.28 ) * ( +this.patient.height / 3.28));
    this.bmi_val = +this.patient.weight / ((+this.patient.height / 100) * (+this.patient.height / 100));
    this.patient.bmi = "" + Math.round(this.bmi_val * 100) / 100;
    this.logger.info(this.CLASSNAME, "ngOnInit", "Patient ID: [" + this.patient.id + "] BMI: [" + this.bmi_val + "]");
  }
}
