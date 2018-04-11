import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../../shared/models/patient';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../../auth/auth.service';
import { AuthGuard } from '../../../auth/auth-guard.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  patient : Patient = {
    type:'',
    firstname:'',
    middlename:'',
    lastname:'',
    gender:'',
    birthdate:'',
    address:'',
    occupation:'',
    landline:null,
    mobile:null,
    email:'',
    height:'',
    weight:'',
    bmi:'',
    idDoc: '',
    emgy_firstname: '',
    emgy_lastname: '',
    emgy_midname: '',
    emgy_contact: null,
    emgy_email: '',
  }
  
  ptnCollection: AngularFirestoreCollection<any> = this.afs.collection('patients');
  ptnObserver = this.ptnCollection.valueChanges();

  constructor(
    private location: Location,
    private router: Router,
    private afs: AngularFirestore,
    private authService: AuthService
  ) { 
    this.patient.idDoc = this.authService.getUidOfCurrentDoctor();
  }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

  addPatient(form){
    //Logic for Add Patient Here
    
    if(form.valid){
      this.ptnCollection.add({
        type: this.patient.type,
        firstname: this.patient.firstname,
        middlename: this.patient.middlename,
        lastname: this.patient.lastname,
        gender: this.patient.gender,
        birthdate: this.patient.birthdate,
        address: this.patient.address,
        occupation: this.patient.occupation,
        landline: this.patient.landline,
        mobile: this.patient.mobile,
        email: this.patient.email,
        height: this.patient.height,
        weight: this.patient.weight,
        bmi: this.patient.bmi,
        idDoc: this.patient.idDoc,
        emgy_firstname: this.patient.emgy_firstname,
        emgy_lastname: this.patient.emgy_lastname,
        emgy_midname: this.patient.emgy_midname,
        emgy_contact: this.patient.emgy_contact,
        emgy_email: this.patient.emgy_email

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
