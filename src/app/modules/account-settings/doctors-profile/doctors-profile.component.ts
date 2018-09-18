import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Doctor } from '../../../shared/models/doctor';
import { DoctorService } from '../../../shared/service/doctor.service';

@Component({
  selector: 'app-doctors-profile',
  templateUrl: './doctors-profile.component.html',
  styleUrls: ['./doctors-profile.component.css']
})
export class DoctorsProfileComponent implements OnInit {
  doctors: Doctor[];
  doctor: Doctor;
  constructor(
    private location: Location,
    private docService: DoctorService,
  ) { }

  ngOnInit() {
    this.loadDoctor();
  }

  loadDoctor(){
    console.log(this.docService.getDoctor()); 
    this.docService.getDoctor().subscribe(ret => {
      setTimeout(() => {
        // returren(ret);
        console.log('display');
        this.setDoctor(ret[0]);
      }, 500);
      console.log(ret);
      this.doctors = ret;
      // this.doctor = ret;
    });
    
  }

  setDoctor(_doc: Doctor){

    this.doctor = {
      name: _doc.name,
      email: _doc.email,
      professionalRate: _doc.professionalRate,
    }

  }


  goBack(){
    console.log(this.doctor);
    // this.location.back();
  }
}
