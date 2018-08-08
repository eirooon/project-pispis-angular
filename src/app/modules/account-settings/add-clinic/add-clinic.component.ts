import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormGroup,  FormControl , Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../../shared/service/auth.service';
import { AllProvince } from '../../../shared/constantValues/provinceConstants';
import { AllCity } from '../../../shared/constantValues/cityConstants';
import { AllHospitals } from '../../../shared/constantValues/hospitalConstants';
import { Router } from '@angular/router';
import { ClinicScheduleModel} from '../../../shared/models/clinicScheduleModel';
import {Clinic} from '../../../shared/models/clinicModel';


@Component({
  selector: 'app-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.css'],
})

export class AddClinicComponent implements OnInit {

  provinceList = AllProvince;
  cityList = AllCity;
  hospitalList = AllHospitals;
  clinicSchedules:any={};
  clinicSchedulesList : ClinicScheduleModel[];
  clinic: Clinic;

  clinicCollection: AngularFirestoreCollection<any> = this.afs.collection('clinics');

  ptnObserver = this.clinicCollection.valueChanges();

  clinicForm = new FormGroup({
    clinicname: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    phone: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    city: new FormControl('',Validators.required),
    hospital: new FormControl('', Validators.required),
    roomnumber: new FormControl('', Validators.required),
  });

  constructor(
    private location: Location,
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.router)
    this.clinic = {
      idDoc:'',
      clinicname:'',
      province:'',
      city:'',
      hospital:'',
      roomnumber:'',
    }
    this.getClinicSchedule();
    this.loadClinicDetailsFromStorage();

  }

  get clinicname(){
    return this.clinicForm.get('clinicname');
  }

  get address(){
    return this.clinicForm.get('address');
  }

  get province(){
    return this.clinicForm.get('province');
  }

  get city(){
    return this.clinicForm.get('city');
  }

  get hospital(){
    return this.clinicForm.get('hospital');
  }

  get roomnumber(){
    return this. clinicForm.get('roomnumber');
  }

  goBack(){
    this.location.back();
  }

  addClinic(){
    

    console.error(this.clinicForm.value.province);
    if(this.clinicForm.valid){
      this.clinicCollection.add({
        idDoc: this.authService.getUidOfCurrentDoctor(),
        clinicname: this.clinicForm.value.clinicname,
        province: this.clinicForm.value.province,
        city: this.clinicForm.value.city,
        hospital: this.clinicForm.value.hospital,
        roomnumber: this.clinicForm.value.roomnumber,
      })
      .then((docRef) => {
        this.clinicCollection.doc(docRef.id).update({
          prodid: docRef.id
        })
        if(this.clinicSchedulesList){
        this.clinicSchedulesList.forEach(element => {
          console.log('Add Clinic Schedule element:' + element);
          this.afs.collection('clinics').doc(docRef.id).collection('clinicSchedule').add({
            clinicSchedule:  element
          })
        });
      }
      
        console.log('Clinic schedule list:' + this.clinicSchedulesList);
        console.log('[Clinic-Add] Doc Ref: ' + docRef.id);
        this.goBack();
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    }else {
    console.log('[Clinic-Add] Form is invalid');
    }

    
  }

  addClinicSchedule(){
    console.log("addClinicSchedule()");
    this.temporaryStoreClinicDetailsToStorage();
    this.router.navigate(['/account-settings/clinic/add-schedule']);
  }

  loadClinicDetailsFromStorage(){
     //check if object is in storage
     console.log("loadClinicDetailsFromStorage()");
     var retrievedObject = localStorage.getItem('temporaryStoreClinicDetailsToStorage');
     this.clinic = JSON.parse(retrievedObject);
     console.log('temporaryStoreClinicDetailsToStorage: ', JSON.parse(retrievedObject));
     this.clinicForm.get('clinicname').setValue(this.clinic.clinicname);
     this.clinicForm.get('province').setValue (this.clinic.province);
     this.clinicForm.get('city').setValue(this.clinic.city);
     this.clinicForm.get('hospital').setValue (this.clinic.hospital);
     this.clinicForm.get('roomnumber').setValue (this.clinic.roomnumber);
  }

  temporaryStoreClinicDetailsToStorage(){
    //check if object is in storage
    this.clinic.clinicname= this.clinicForm.value.clinicname,
    this.clinic.province= this.clinicForm.value.province,
    this.clinic.city= this.clinicForm.value.city,
    this.clinic.hospital= this.clinicForm.value.hospital,
    this.clinic.roomnumber=this.clinicForm.value.roomnumber,
    // Put the object into storage
    localStorage.setItem('temporaryStoreClinicDetailsToStorage', JSON.stringify( this.clinic));
    console.log("temporaryStoreClinicDetailsToStorage" + this.clinic);
  }
  
  getClinicSchedule(){
    console.log("getClinicSchedule()");
    var retrievedObject = localStorage.getItem('testObject');
    this.clinicSchedulesList = JSON.parse(retrievedObject);
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
  }
}
