import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Logger } from '../../../../shared/service/logger.service';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';

import { Patient } from '../../../../shared/models/patient';
import { PatientService } from '../../../../shared/service/patient.service';

import { ConsultationTextModel } from '../../../../shared/models/consulationModel';
import { MedicineModel } from '../../../../shared/models/medicineModel';
export interface IContext {
  data: string;
}

@Component({
  selector: 'app-pd-consultation-prescription',
  templateUrl: './pd-consultation-prescription.component.html',
  styleUrls: ['./pd-consultation-prescription.component.css']
})
export class PdConsultationPrescriptionComponent implements OnInit {
  @ViewChild('addPrescriptionModal')
  public modalTemplate: ModalTemplate<IContext, string, string>

  CLASSNAME: string = this.constructor.name;
  
  consultationText: ConsultationTextModel;
  medicineModel: MedicineModel[] = [];
  patient: Patient;

  constructor(
    private location: Location,
    private router: Router,
    public modalService: SuiModalService,
    private logger: Logger,
    private patientService: PatientService,
  ) {
    //this.ngOnInit();
    this.patient = this.patientService.getPatientById(); //THIS PART ANG GA ERROR.
    console.log("Patient id: " + this.patient.id);
    this.logger.info(this.CLASSNAME, "constructor", "" );
  }

  prescriptionForm = new FormGroup({
    clinicname: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    text: new FormControl("", Validators.required), //Remarks 
    patientType: new FormControl("", Validators.required)
  })

  medicineForm = new FormGroup({
    medicineName: new FormControl("", Validators.required),
    brandName: new FormControl("", Validators.required),
    genericName: new FormControl("", Validators.required),
    dose: new FormControl("", Validators.required),
    form: new FormControl("", Validators.required),
    qty: new FormControl("", Validators.required),
    note: new FormControl(""),
    frequency: new FormControl(""),
    startDate: new FormControl(""),
    endDate: new FormControl(""),
  })

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Initial Load");
    this.patient = this.patientService.getPatientById(); //THIS PART ANG GA ERROR.
  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    // this.location.back();
    console.log(this.medicineModel);
  }

  /**
   * Method: openAddPrescriptionModal
   * Description: Open add prescription modal
   */
  public openAddPrescriptionModal() {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    config.mustScroll = true;
    config.size = 'normal';
    this.modalService
      .open(config)
      .onApprove(result => {
      })
      .onDeny(result => {
        this.logger.info(this.CLASSNAME, "openAddPrescriptionModal", "Cancel");
      });
  }

  addMedicine(){
    if (this.medicineForm.valid) {
      this.medicineModel.push({
        medicine: this.medicineForm.value.medicineName, 
        brand: this.medicineForm.value.brandName, 
        generic: this.medicineForm.value.genericName, 
        dose: this.medicineForm.value.dose,
        form: this.medicineForm.value.form,
        qty: this.medicineForm.value.qty,
        note: this.medicineForm.value.note,
        frequency: this.medicineForm.value.frequency,
        startDate: this.medicineForm.value.startDate,
        endDate: this.medicineForm.value.endDate});
    } else {
      this.logger.error(this.CLASSNAME, "addMedicine", "Error: Form is invalid");
    }
    console.log(this.medicineForm.value.medicineName, 
                this.medicineForm.value.brandName, 
                this.medicineForm.value.genericName, 
                this.medicineForm.value.dose,
                this.medicineForm.value.form,
                this.medicineForm.value.qty,
                this.medicineForm.value.note,
                this.medicineForm.value.frequency,
                this.medicineForm.value.startDate);
  }

  addConsultationPrescription(){
    console.log('DPUTA KA');
    // if (this.prescriptionForm.valid) {

    // } else {
    //   this.logger.error(this.CLASSNAME, "addConsultationText", "Error: Form is invalid");
    // }
    // this.consultationText.type = "Prescription";
    // this.consultationText.idPatient = this.patient.id;
    // this.consultationText.clinicname = this.prescriptionForm.value.clinicname,
    // this.consultationText.date = this.prescriptionForm.value.date;
    // this.consultationText.text = this.prescriptionForm.value.text;
    // this.consultationText.patientType = this.prescriptionForm.value.patientType;
    // this.consultationService.addConsultationText(this.consultationText);
    // this.logger.info(this.CLASSNAME, "addConsultationText", "Clinic name: [" + this.clinicname + "] Adding Consulation done.");
    // this.router.navigateByUrl['/patient/patient-details'];
    console.log("Prescription",
                this.patient.id,
                this.prescriptionForm.value.clinicname,
                this.prescriptionForm.value.date,
                this.prescriptionForm.value.text,
                this.prescriptionForm.value.patientType);
  }
}
