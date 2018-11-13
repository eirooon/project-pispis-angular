import { Component, OnInit } from '@angular/core';
import { ConsultationService } from '../../../../shared/service/consultation.service';
import { ConsultationTextModel } from '../../../../shared/models/consulationModel';
import { ClinicService } from '../../../../shared/service/clinic.service';
import { PatientService } from '../../../../shared/service/patient.service';
import { Patient } from '../../../../shared/models/patientModel';
import { Logger } from '../../../../shared/service/logger.service';

@Component({
  selector: 'pd-consultation',
  templateUrl: './pd-consultation.component.html',
  styleUrls: ['./pd-consultation.component.css']
})
export class PdConsultationComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;
  hasList: Boolean;
  consultations: ConsultationTextModel[];
  patient: Patient;

  constructor(
    private consultationService: ConsultationService,
    private patientService: PatientService,
    private logger: Logger
  ) {
    this.patient = patientService.getPatientById();
    this.ngOnInit();
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.consultationService.getConsultationText(localStorage.getItem("ptId"))
      .subscribe(consultations => {
        if (consultations.length > 0) {
          this.hasList = true;
          this.consultations = consultations;
          this.logger.info(this.CLASSNAME, "ngOnInit", "Clinic data: [" + this.consultations + "] List Loaded");
        } else {
          this.hasList = false;
        }
      },
        err => {
          this.logger.info(this.CLASSNAME, "ngOnInit", "Error: " + err.message);
          this.hasList = false;
        },
    );

    // for (var x = 0; x < this.consultations.length; x++) {
    //   var secondIndex = x + 1;
    //   if (secondIndex < this.consultations.length && this.consultations[x].date == this.consultations[secondIndex].date)
    //     this.consultations[secondIndex].date = "";
    // }
  }

}
