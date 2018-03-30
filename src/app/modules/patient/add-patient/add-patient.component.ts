import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
//import { Patient } from '../../../shared/models/patient';
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  type:string;
	firstname:string;
	middlename:string;
	lastname:string;
	gender:string;
	birthdate:string;
	address:string;
	occupation:string;
	landline:number;
	mobile:number;
	email:string;
	height:string;
	weight:string;
	bmi:string;

  ptnCollection: AngularFirestoreCollection<any> = this.afs.collection('patients');
  ptnObserver = this.ptnCollection.valueChanges();

  constructor(
    private location: Location,
    private router: Router,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

  addPatient(){
    //Logic for Add Patient Here
    
    this.ptnCollection.add({
      type: this.type,
      firstname: this.firstname,
      middlename: this.middlename,
      lastname: this.lastname,
      gender: this.gender,
      birthdate: this.birthdate,
      address: this.address,
      occupation: this.occupation,
      landline: this.landline,
      mobile: this.mobile,
      email: this.email,
      height: this.height,
      weight: this.weight,
      bmi: this.bmi
    }).then((docRef) => {
      this.ptnCollection.doc(docRef.id).update({
        prodid: docRef.id
      })
      console.log(docRef.id);
      this.router.navigateByUrl('/patient');
    }).catch((err) => {
      console.log(err);
    })
  }
}
