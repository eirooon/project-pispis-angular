import { Component, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { PatientService } from '../../shared/service/patient.service';
import { DoctorService } from '../../shared/service/doctor.service';
import { Patient } from '../../shared/models/patient';
import { Doctor } from '../../shared/models/doctor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  myTitle = "Home"

  patients: Patient[];
  doctors: Doctor[];

  constructor(
    private router: Router,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private ngProgress: NgProgress
  ) { 

    this.getDoctorsName();
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
         window.scrollTo(0, 0)
      });
      this.ngProgress.start();
      this.patientService.getRecentAddedPatients().subscribe(patients => { 
        if(patients.length > 0){
          console.log('[List-Patient] List retrieve successful');
          this.patients = patients;
        } else {
          //do nothing.
        }
        this.ngProgress.done();
      },
      err => {
        console.error('[List-Patient] Error:', err.message);
      },
    );
  }

  getPatientDetailsHome(event, patient){
    this.patientService.setPatient(patient);
  }

  getDoctorsName(){
    this.doctorService.getDoctorsName().subscribe(doctors => { 
        if(doctors.length > 0){
          console.log('[Doctor] List retrieve successful');
          this.doctors = doctors;
        } else {
          //do nothing.
        }
      }
    );
  }
}
