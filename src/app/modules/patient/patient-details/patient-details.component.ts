import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { slideToRight, slideToLeft, fadeAnimation} from '../../../router.animations';
import { Patient } from '../../../shared/models/patient';
import { PatientService } from '../../../shared/service/patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
  animations: [slideToLeft(), fadeAnimation(), slideToRight()],
  host: {'[@fadeAnimation]': ''}
})
export class PatientDetailsComponent implements OnInit {

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
