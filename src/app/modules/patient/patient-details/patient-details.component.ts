import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { slideToRight, slideToLeft, fadeAnimation } from '../../../router.animations';
import { ConsultationService } from '../../../shared/service/consultation.service';
import { AuthService } from '../../../shared/service/auth.service';
import { PatientService } from '../../../shared/service/patient.service';
import { Logger } from '../../../shared/service/logger.service';
import { ConsultationTextModel } from '../../../shared/models/consulationModel';
import { SharedModule } from '../../../shared/shared.module';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
  animations: [slideToLeft(), fadeAnimation(), slideToRight()],
  host: { '[@fadeAnimation]': '' }
})
export class PatientDetailsComponent implements OnInit {
  consultationTabActive = true;
  patientProfileTabActive = false;
  healthProfileTabActive = false;
  vitalSignsTabActive = false;
  healthRecordTabActive = false;
  tabname:String;

  CLASSNAME: string = this.constructor.name;

  constructor(
    private location: Location,
    private patientService: PatientService,
    private logger: Logger,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ngOnInit();
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.logger.info(this.CLASSNAME, "ngOnInit", this.patientService.getPatient().id);
    localStorage.setItem("ptId", this.patientService.getPatient().id);

    this.route.paramMap.subscribe(params => {
      console.log("PARAMS: ", params.get('tabname'));
    });
  }
  
  /**
   * Method: goBack
   * Description: Go Back to previous page
   * @return void
   */
  goBack() {
    this.location.back();
  }

  consultationTabClicked(){
    this.consultationTabActive = true;
    this.patientProfileTabActive = false;
    this.healthProfileTabActive = false;
    this.vitalSignsTabActive = false;
    this.healthRecordTabActive = false;

  }
  personalProfileTabClicked(){
    this.consultationTabActive = false;
    this.patientProfileTabActive = true;
    this.healthProfileTabActive = false;
    this.vitalSignsTabActive = false;
    this.healthRecordTabActive = false;
  }
  healthProfileTabClicked(){
    this.consultationTabActive = false;
    this.patientProfileTabActive = false;
    this.healthProfileTabActive = true;
    this.vitalSignsTabActive = false;
    this.healthRecordTabActive = false;
  }
  vitalSignsTabClicked(){
    this.consultationTabActive = false;
    this.patientProfileTabActive = false;
    this.healthProfileTabActive = false;
    this.vitalSignsTabActive = true;
    this.healthRecordTabActive = false;
  }

  healthRecordTabClicked(){
    this.consultationTabActive = false;
    this.patientProfileTabActive = false;
    this.healthProfileTabActive = false;
    this.vitalSignsTabActive = false;
    this.healthRecordTabActive = true;
  }



}
