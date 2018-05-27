import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
    private patientService: PatientService
  ) { }

  ngOnInit() {
    this.patient = this.patientService.getPatient();
  }

  editPatientDetails(){
    this.patientService.setIsEdit(true);
  }

  goBack(){
    this.location.back();
  }

}
