import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Logger } from '../../../../shared/service/logger.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';
import { validateArgCount } from '@firebase/util';
import { ConsultationTextModel } from '../../../../shared/models/consulationModel';
import { ConsultationService } from '../../../../shared/service/consultation.service';
import { Patient } from '../../../../shared/models/patient';
import { PatientService } from '../../../../shared/service/patient.service';
import { VitalsModel } from '../../../../shared/models/vitalsModel';
import { VitalSignsService } from '../../../../shared/service/vital-signs.service';

@Component({
  selector: 'app-pd-vital-signs-all',
  templateUrl: './pd-vital-signs-all.component.html',
  styleUrls: ['./pd-vital-signs-all.component.css']
})
export class PdVitalSignsAllComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;
  vitals: VitalsModel;
  patient: Patient;

  constructor(
    private location: Location,
    private router: Router,
    private logger: Logger,
    private vitalsService: VitalSignsService,
    private patientService: PatientService) {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Initial Load");
    this.patient = this.patientService.getPatientById();
  }

  vitalsForm = new FormGroup({
    date: new FormControl(""),
    weight: new FormControl(""),
    height: new FormControl(""),
    bloodPressure: new FormControl(""),
    oxygenSaturation: new FormControl(""),
    respiratoryRate: new FormControl(""),
    heartRate: new FormControl(""),
    bodyTemperature: new FormControl(""),
    headCircumference: new FormControl(""),
    capillaryBloodGlucose: new FormControl(""),
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
    this.vitals = {
      id: '',
      idPatient: '',
      date: '',
      weight: '',
      height: '',
      bloodPressure: '',
      oxygenSaturation: '',
      respiratoryRate: '',
      heartRate: '',
      bodyTemperature: '',
      headCircumference: '',
      capillaryBloodGlucose: '',
    }
  }


  addVitals() {
    if (this.vitalsForm.valid) {
      this.vitals.idPatient = this.patient.id;
      this.vitals.date = this.vitalsForm.value.date;

      this.vitals.weight = this.vitalsForm.value.weight;
      this.vitals.height = this.vitalsForm.value.height;
      this.vitals.bloodPressure = this.vitalsForm.value.bloodPressure;
      this.vitals.oxygenSaturation = this.vitalsForm.value.oxygenSaturation;
      this.vitals.respiratoryRate = this.vitalsForm.value.respiratoryRate;
      this.vitals.heartRate = this.vitalsForm.value.heartRate;
      this.vitals.bodyTemperature = this.vitalsForm.value.bodyTemperature;
      this.vitals.headCircumference = this.vitalsForm.value.headCircumference;
      this.vitals.capillaryBloodGlucose = this.vitalsForm.value.capillaryBloodGlucose;
      this.vitalsService.addVitals(this.vitals);
      this.location.back();
      //this.logger.info(this.CLASSNAME, "addVitals", "Patient name: [" + this.idPatient + "] Adding Consulation done.");
    } else {
      this.logger.error(this.CLASSNAME, "addVitals", "Error: Form is invalid");
    }
  }

}
