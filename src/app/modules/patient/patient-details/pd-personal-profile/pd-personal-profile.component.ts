import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../../../shared/models/patient';
import { PatientService } from '../../../../shared/service/patient.service';
import { Logger } from '../../../../shared/service/logger.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'pd-personal-profile',
  templateUrl: './pd-personal-profile.component.html',
  styleUrls: ['./pd-personal-profile.component.css']
})
export class PdPersonalProfileComponent implements OnInit {

  patients: Observable<Patient[]>;;
  patient: Patient;

  CLASSNAME: string = this.constructor.name;

  constructor(
    private location: Location,
    private patientService: PatientService,
    private router: Router,
    private logger: Logger
  ) {
    
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Patient Personal Profile Load");
    // this.logger.info(this.CLASSNAME, "JOBERN LORETIZO", "Patient: " + localStorage.getItem("ptId"));
    this.patient =  this.patientService.getPatientById();
  }

  /**
   * Method: editPatientDetails
   * Description: Edit Patient Details
   * @return void
   */
  editPatientDetails() {
    this.patientService.updatePatient(this.patient);
    this.router.navigateByUrl('/patient');
    this.logger.info(this.CLASSNAME, "editPatientDetails", "Patient Profile Edited.");
  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    this.patientService.setIsEdit(false);
    this.location.back();
  }

}
