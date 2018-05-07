import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormControl , Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../../shared/service/auth.service';
import { RegionSixProvince, RegionSevenProvince, AllRegion } from '../../../shared/constantValues/regionConstants';
import { CapizCity } from '../../../shared/constantValues/cityConstants';
import { RoxasCityHospitals } from '../../../shared/constantValues/hospitalConstants';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.css']
})
export class AddClinicComponent implements OnInit {

  allRegion = AllRegion
  regionSix =  RegionSixProvince;
  regionSeven = RegionSevenProvince;
  city = CapizCity;
  hospitals = RoxasCityHospitals;

  clinicCollection: AngularFirestoreCollection<any> = this.afs.collection('clinics');
  ptnObserver = this.clinicCollection.valueChanges();

  clinicForm = new FormGroup({
    clinicname: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    region: new FormControl('', Validators.required),
    province: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    hospital: new FormControl('', Validators.required),
    roomnumber: new FormControl('', Validators.required)
  });

  constructor(
    private location: Location,
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  get clinicname(){
    return this.clinicForm.get('clinicname');
  }

  get address(){
    return this.clinicForm.get('address');
  }

  get roomnumber(){
    return this. clinicForm.get('roomnumber');
  }

  goBack(){
    this.location.back();
  }

  addClinic(){
    if(this.clinicForm.valid){
      this.clinicCollection.add({
        idDoc: this.authService.getUidOfCurrentDoctor(),
        clinicname: this.clinicForm.value.clinicname,
        province: this.clinicForm.value.province,
        city: this.clinicForm.value.province,
        hospital: this.clinicForm.value.hospital,
        roomnumber: this.clinicForm.value.roomnumber,
      })
      .then((docRef) => {
        this.clinicCollection.doc(docRef.id).update({
          prodid: docRef.id
        })
        console.log(docRef.id);
        this.router.navigateByUrl('clinic');
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    }else {
    console.log('Form is invalid');
    }
  }
}
