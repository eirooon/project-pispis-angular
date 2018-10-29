import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { slideToRight, slideToLeft, fadeAnimation } from '../../../router.animations';
import { ConsultationService } from '../../../shared/service/consultation.service';
import { AuthService } from '../../../shared/service/auth.service';
import { PatientService } from '../../../shared/service/patient.service';
import { Logger } from '../../../shared/service/logger.service';
import { ConsultationTextModel } from '../../../shared/models/consulationModel';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
  animations: [slideToLeft(), fadeAnimation(), slideToRight()],
  host: { '[@fadeAnimation]': '' }
})
export class PatientDetailsComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;

  constructor(
    private location: Location,
    private consultationService: ConsultationService,
    private authService: AuthService,
    private patientService: PatientService,
    private logger: Logger
  ) {
    this.ngOnInit();
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Patient Details Load");
    localStorage.setItem("ptId", this.patientService.getPatient().id);
  }

  /**
   * Method: goBack
   * Description: Go Back to previous page
   * @return void
   */
  goBack() {
    this.location.back();
  }
}
