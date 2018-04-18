import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../../shared/models/patient';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../../auth/auth.service';
import { AuthGuard } from '../../../auth/auth-guard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/service/validation.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  ptnForm: any;
  
  ptnCollection: AngularFirestoreCollection<any> = this.afs.collection('patients');
  ptnObserver = this.ptnCollection.valueChanges();

  constructor(
    private location: Location,
    private router: Router,
    private afs: AngularFirestore,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { 
    // this.ptnForm.value.idDoc = this.authService.getUidOfCurrentDoctor();
    this.ngOnInit();
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
    });
  }

  goBack(){
    this.location.back();
  }

  addPatient(){
    //Logic for Add ptnForm.value Here
    
    if(this.ptnForm.valid){
      this.ptnCollection.add({
        type: this.ptnForm.value.type,
        firstname: this.ptnForm.value.firstname,
        middlename: this.ptnForm.value.middlename,
        lastname: this.ptnForm.value.lastname,
        gender: this.ptnForm.value.gender,
        birthdate: this.ptnForm.value.birthdate,
        address: this.ptnForm.value.address,
        occupation: this.ptnForm.value.occupation,
        landline: this.ptnForm.value.landline,
        mobile: this.ptnForm.value.mobile,
        email: this.ptnForm.value.email,
        height: this.ptnForm.value.height,
        weight: this.ptnForm.value.weight,
        bmi: this.ptnForm.value.bmi,
        idDoc: this.authService.getUidOfCurrentDoctor(),
        emgy_firstname: this.ptnForm.value.emgy_firstname,
        emgy_lastname: this.ptnForm.value.emgy_lastname,
        emgy_middlename: this.ptnForm.value.emgy_middlename,
        emgy_contact: this.ptnForm.value.emgy_contact,
        emgy_email: this.ptnForm.value.emgy_email

      }).then((docRef) => {
        this.ptnCollection.doc(docRef.id).update({
          prodid: docRef.id
        })
        console.log(docRef.id);
        this.router.navigateByUrl('/patient');
      }).catch((err) => {
        console.log(err);
      })
    } else {
      console.log('Form is invalid');
    }

  }
}
