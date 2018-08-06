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


  clinicCollection: AngularFirestoreCollection<any> = this.afs.collection('clinics');

  ptnObserver = this.clinicCollection.valueChanges();

  clinicForm = new FormGroup({
    clinicname: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    phone: new FormControl(),
    mobile: new FormControl(),
    province: new FormControl('', Validators.required),
    city: new FormControl('',Validators.required),
    hospital: new FormControl('', Validators.required),
    roomnumber: new FormControl('', Validators.required),
    clinic: new FormControl('', Validators.required)
  });

  constructor(
    private location: Location,
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getClinicSchedule();
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

        this.afs.collection('clinics').doc(docRef.id).collection('clinicSchedule').add({
          clinicDay:  this.clinicSchedulesList
        })
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

  }

  getClinicSchedule(){
    console.log("getClinicSchedule()");
    var retrievedObject = localStorage.getItem('testObject');
    this.clinicSchedulesList = JSON.parse(retrievedObject);
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
  }
}
