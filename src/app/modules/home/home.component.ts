import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { PatientService } from '../../shared/service/patient.service';
import { DoctorService } from '../../shared/service/doctor.service';
import { Logger } from '../../shared/service/logger.service';
import { Patient } from '../../shared/models/patient';
import { Doctor } from '../../shared/models/doctor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  myTitle = "Home"
  CLASSNAME: string = this.constructor.name;
  patients: Patient[];
  doctors: Doctor[];

  constructor(
    private router: Router,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private ngProgress: NgProgress,
    private logger: Logger
  ) {
    this.getDoctorsName();
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.ngProgress.start();
    this.patientService.loadRecentAddedPatients().subscribe(patients => {
      if (patients.length > 0) {
        this.patients = patients;
        this.logger.info(this.CLASSNAME, "ngOnInit", "Patient List Retrieved");
      } else {
        //do nothing.
      }
      this.ngProgress.done();
    },
      err => {
        this.logger.error(this.CLASSNAME, "ngOnInit", "Error: " + err.message);
      },
    );
  }

  /**
   * Method: getPatientDetailsHome
   * Description: Get Patient Details
   * @param event 
   * @param patient 
   * @return void
   */
  // getPatientDetailsHome(event, patient) {
  //   this.patientService.setPatient(patient);
  // }

  /**
   * Method: getDoctorsName
   * Description: Get Doctors name
   * @return void
   */
  getDoctorsName() {
    this.doctorService.getDoctorsName().subscribe(doctors => {
      if (doctors.length > 0) {
        this.doctors = doctors;
        this.logger.info(this.CLASSNAME, "getDoctorsName", "Doctors Name: [" + this.getDoctorsName.name + "]");
      } else {
        //do nothing.
      }
    }
    );
  }
}
