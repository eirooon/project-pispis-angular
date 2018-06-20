import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../../shared/models/patient';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../../shared/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/service/validation.service';
import { PatientService } from '../../../shared/service/patient.service';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  ptnForm: any;

  patient: Patient;
  
  ptnCollection: AngularFirestoreCollection<any> = this.afs.collection('patients');
  ptnObserver = this.ptnCollection.valueChanges();

  constructor(
    private location: Location,
    private router: Router,
    private afs: AngularFirestore,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private patientService: PatientService
  ) {
    this.ngOnInit();
    this.initializePatient();
  }

  ngOnInit() {
    this.ptnForm = this.formBuilder.group({
      type:['', Validators.required],
      firstname:['', Validators.required],
      middlename:['', Validators.required],
      lastname:['', Validators.required],
      gender:['', Validators.required],
      birthdate:['', Validators.required],
      address:['', Validators.required],
      occupation:[''],
      landline:[''],
      mobile:['', [Validators.required, Validators.minLength(11)]],
      email:[''],
      height:[''],
      weight:[''],
      bmi:[''],
      emgy_firstname: ['', Validators.required],
      emgy_lastname: ['', Validators.required],
      emgy_middlename: ['', Validators.required],
      emgy_contact: ['', [Validators.required, Validators.minLength(11)]],
      emgy_email: [''],
      dateAdded: new Date(),
    });
  }

  initializePatient(){
    this.patient = {
      id:'',
      idDoc: this.authService.getUidOfCurrentDoctor(),
      firstname:'',
      middlename:'',
      lastname:'',
      gender:'',
      birthdate:'',
      address:'',
      occupation:'',
      landline:0,
      mobile:0,
      email:'',
      height:'',
      weight:'',
      bmi:'',
      type:'',
      emgy_firstname:'',
      emgy_middlename:'',
      emgy_lastname:'',
      emgy_contact:0,
      emgy_email:'',
      dateAdded: new Date()
    }
  }

  goBack(){
    this.location.back();
  }

  addPatient(){
    //Check for valid inputs
    if(this.ptnForm.valid){
      this.patientService.addPatient(this.patient);
      this.router.navigateByUrl('/patient');
      console.log('[Add-Patient] Adding Successful');
    } else {
      console.log('[Add-Patient] Error: Form is invalid'); 
    }
  }
}
