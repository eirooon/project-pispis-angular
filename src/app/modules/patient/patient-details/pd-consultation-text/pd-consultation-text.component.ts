import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConsultationTextModel } from '../../../../shared/models/consulationModel';
import { ConsultationService } from '../../../../shared/service/consultation.service';
import { AuthService } from '../../../../shared/service/auth.service';
import { ClinicService } from '../../../../shared/service/clinic.service';
import { Clinic } from '../../../../shared/models/clinicModel';
import { Patient } from '../../../../shared/models/patient';
import { PatientService } from '../../../../shared/service/patient.service';
import { Logger } from '../../../../shared/service/logger.service';


@Component({
  selector: 'app-pd-consultation-text',
  templateUrl: './pd-consultation-text.component.html',
  styleUrls: ['./pd-consultation-text.component.css']
})
export class PdConsultationTextComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;
  consultationText: ConsultationTextModel;
  clinicsList: Clinic[];
  patient: Patient;

  constructor(
    private location: Location,
    private router: Router,
    private consultationService: ConsultationService,
    private authService: AuthService,
    private clinicService: ClinicService,
    private patientService: PatientService,
    private logger: Logger
  ) {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Initial Load");
    this.patient = this.patientService.getPatientById();
  }

  consultationForm = new FormGroup({
    clinicname: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    text: new FormControl("", Validators.required),
    patientType: new FormControl("", Validators.required)
  })

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.initializeConsultation();
    this.clinicService.getClinics().subscribe(clinics => {
      if (clinics.length > 0) {
        this.clinicsList = clinics;
        this.logger.info(this.CLASSNAME, "ngOnInit", "Clinic data: " + this.clinicsList);
      }
    },
      err => {
        this.logger.error(this.CLASSNAME, "ngOnInit", "Error: " + err.message);
      },
    );
  }

  /**
   * Method: cancel
   * Description: Execute Cancel
   * @return void
   */
  cancel() {
    this.router.navigateByUrl('/patient/patient-details');
  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    this.location.back();
  }

  /**
   * Method: addText
   * Description: Navigate to patient details
   * @return void
   */
  addText() {
    this.router.navigateByUrl('/patient/patient-details');
  }

  /**
   * Method: clinicname
   * Description: Get clinic name
   * @return clinicname
   */
  get clinicname() {
    return this.consultationForm.get("clinicname");
  }

  /**
   * Method: date
   * Description: Get date
   * @return date
   */
  get date() {
    return this.consultationForm.get("date");
  }

  /**
   * Method: text
   * Description: Get text
   * @return text
   */
  get text() {
    return this.consultationForm.get("text");
  }

  /**
   * Method: patientType
   * Description: Get patient type
   * @return patientType
   */
  get patientType() {
    return this.consultationForm.get("patientType")
  }

  /**
   * Method: initializeConsultation
   * Description: Initialize Consulation
   * @return void
   */
  initializeConsultation() {
    this.consultationText = {
      id: '',
      idPatient: '',
      clinicname: '',
      text: '',
      date: '',
      type: '',
      patientType: ''
    }
  }

  /**
   * Method: addConsultationText
   * Description: Add consultation of type Text with specific Patient ID
   * @return void
   */
  addConsultationText() {
    if (this.consultationForm.valid) {
      this.consultationText.type = "Text";
      this.consultationText.idPatient = this.patient.id;
      this.consultationText.clinicname = this.consultationForm.value.clinicname,
      this.consultationText.date = this.consultationForm.value.date;
      this.consultationText.text = this.consultationForm.value.text;
      this.consultationText.patientType = this.consultationForm.value.patientType;
      this.consultationService.addConsultationText(this.consultationText);
      this.logger.info(this.CLASSNAME, "addConsultationText", "Clinic name: [" + this.clinicname + "] Adding Consulation done.");
      this.router.navigateByUrl['../patient/patient-details'];
    } else {
      this.logger.error(this.CLASSNAME, "addConsultationText", "Error: Form is invalid");
    }
  }

  /**
   * Method: addConsultationPrescription
   * Description: Add consultation Prescription
   * @return void
   */
  addConsultationPrescription() {
    // add code here
  }


}
