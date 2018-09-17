import { Component, OnInit } from '@angular/core';
import { ConsultationService } from '../../../../shared/service/consultation.service';
import { ConsultationTextModel } from '../../../../shared/models/consulationModel';
import { ClinicService } from '../../../../shared/service/clinic.service';
import { PatientService } from '../../../../shared/service/patient.service';
import { Patient } from '../../../../shared/models/patient';

@Component({
  selector: 'pd-consultation',
  templateUrl: './pd-consultation.component.html',
  styleUrls: ['./pd-consultation.component.css']
})
export class PdConsultationComponent implements OnInit {

  hasList: Boolean;
  consultations: ConsultationTextModel[];
  patient: Patient;

  constructor(private consultationService: ConsultationService, private patientService: PatientService) {
    this.patient = patientService.getPatient();
  }

  ngOnInit() {
    this.consultationService.getConsultationText(this.patient.id)
      .subscribe(consultations => {
        if (consultations.length > 0) {
          console.log('[Clinic] List loaded successful');
          this.hasList = true;
          this.consultations = consultations;
          console.log('[Clinic] Clinic data: ' + this.consultations);
        } else {
          this.hasList = false;
        }
      },
        err => {
          console.error('[consultations] Error: ', err.message);
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
