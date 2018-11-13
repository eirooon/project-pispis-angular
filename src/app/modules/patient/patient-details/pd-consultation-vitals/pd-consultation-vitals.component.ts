import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Logger } from '../../../../shared/service/logger.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';
import { validateArgCount } from '@firebase/util';
import { ConsultationTextModel } from '../../../../shared/models/consulationModel';
import { ConsultationService } from '../../../../shared/service/consultation.service';
import { Patient } from '../../../../shared/models/patientModel';
import { PatientService } from '../../../../shared/service/patient.service';

@Component({
  selector: 'app-pd-consultation-vitals',
  templateUrl: './pd-consultation-vitals.component.html',
  styleUrls: ['./pd-consultation-vitals.component.css']
})
export class PdConsultationVitalsComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;
  consultationText: ConsultationTextModel;
  patient: Patient;

  constructor(
    private location: Location,
    private router: Router,
    private logger: Logger,
    private consultationService: ConsultationService,
    private patientService: PatientService,) {    
     this.logger.info(this.CLASSNAME, "ngOnInit", "Initial Load");
    this.patient = this.patientService.getPatientById();
  }

  vitalsForm = new FormGroup({
    clinicname: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    patientType: new FormControl("", Validators.required),
    weight: new FormControl("", Validators.required),
    height: new FormControl("", Validators.required),
    bloodPressure: new FormControl("", Validators.required),
    oxygenSaturation: new FormControl("", Validators.required),
    respiratoryRate: new FormControl("", Validators.required),
    heartRate: new FormControl("", Validators.required),
    bodyTemperature: new FormControl("", Validators.required),
    headCircumference: new FormControl("", Validators.required),
    capillaryBloodGlucose: new FormControl("", Validators.required),
  })

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.initializeVitals();
    this.logger.info(this.CLASSNAME, "ngOnInit", "Consultation Vitals Load");
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
   * Method: clinicname
   * Description: Get clinic name
   * @return clinicname
   */
  get clinicname() {
    return this.vitalsForm.get("clinicname");
  }

  /**
   * Method: date
   * Description: Get date
   * @return date
   */
  get date() {
    return this.vitalsForm.get("date");
  }

  get weight() {
    return this.vitalsForm.get("weight");
  }

  get height() {
    return this.vitalsForm.get("height");
  }

  get bloodPressure() {
    return this.vitalsForm.get("bloodPressure");
  }

  get oxygenSaturation() {
    return this.vitalsForm.get("oxygenSaturation");
  }

  get respiratoryRate() {
    return this.vitalsForm.get("respiratoryRate");
  }

  get heartRate() {
    return this.vitalsForm.get("heartRate");
  }

  get headCircumference() {
    return this.vitalsForm.get("headCircumference");
  }

  get capillaryBloodGlucose() {
    return this.vitalsForm.get("capillaryBloodGlucose");
  }


  /**
   * Method: patientType
   * Description: Get patient type
   * @return patientType
   */
  get patientType() {
    return this.vitalsForm.get("patientType")
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
   * Method: initializeConsultation
   * Description: Initialize Consulation
   * @return void
   */
  initializeVitals() {
    this.consultationText = {
      id: '',
      idPatient: '',
      clinicname: '',
      text: '',
      date: '',
      type: '',
      patientType: '',
      weight:'',
      height:'',
      bloodPressure:'',
      oxygenSaturation:'',
      respiratoryRate:'',
      heartRate:'',
      bodyTemperature:'',
      headCircumference:'',
      capillaryBloodGlucose:'',
    }
  }


  addConsultationVitals(){
    if (this.vitalsForm.valid) {
      this.consultationText.type = "Vitals";
      this.consultationText.idPatient = this.patient.id;
      this.consultationText.clinicname = this.vitalsForm.value.clinicname,
      this.consultationText.date = this.vitalsForm.value.date;
      this.consultationText.patientType = this.vitalsForm.value.patientType;

      this.consultationText.weight = this.vitalsForm.value.weight;
      this.consultationText.height = this.vitalsForm.value.height;
      this.consultationText.bloodPressure= this.vitalsForm.value.bloodPressure;
      this.consultationText.oxygenSaturation= this.vitalsForm.value.oxygenSaturation;
      this.consultationText.respiratoryRate= this.vitalsForm.value.respiratoryRate;
      this.consultationText.heartRate= this.vitalsForm.value.heartRate;
      this.consultationText.bodyTemperature= this.vitalsForm.value.bodyTemperature;
      this.consultationText.headCircumference= this.vitalsForm.value.headCircumference;
      this.consultationText.capillaryBloodGlucose= this.vitalsForm.value.capillaryBloodGlucose;
      this.consultationService.addConsultationText(this.consultationText);
      this.location.back();
      this.logger.info(this.CLASSNAME, "addVitals", "Clinic name: [" + this.clinicname + "] Adding Consulation done.");
    } else {
      this.logger.error(this.CLASSNAME, "addVitals", "Error: Form is invalid");
    }
  }
}
