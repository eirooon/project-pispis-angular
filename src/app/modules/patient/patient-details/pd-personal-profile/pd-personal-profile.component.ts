import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../../../shared/models/patient';
import { PatientService } from '../../../../shared/service/patient.service';

@Component({
  selector: 'pd-personal-profile',
  templateUrl: './pd-personal-profile.component.html',
  styleUrls: ['./pd-personal-profile.component.css']
})
export class PdPersonalProfileComponent implements OnInit {
  
  patient: Patient;

  constructor(
    private location: Location,
    private patientService: PatientService,
    private router: Router,
  ) { 
    this.ngOnInit();

  }

  ngOnInit() {
    this.patient = this.patientService.getPatient();
  }

  editPatientDetails(){
    this.patientService.updatePatient(this.patient);
    this.router.navigateByUrl('/patient');
    console.log('[Personal-Profile][OK] Patient Profile Edited.');
  }

  goBack(){
    this.patientService.setIsEdit(false);
    this.patientService.setPatient(null);
    this.location.back();
  }

}
