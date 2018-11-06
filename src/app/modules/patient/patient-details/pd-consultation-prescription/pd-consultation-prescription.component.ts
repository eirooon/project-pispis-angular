import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Logger } from '../../../../shared/service/logger.service';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';

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
  medicineModel: MedicineModel[];

  constructor(
    private location: Location,
    private router: Router,
    public modalService: SuiModalService,
    private logger: Logger
  ) {
    this.ngOnInit();
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
    notes: new FormControl(""),
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
    console.log(this.medicineForm.value.medicineName);
  }

  addConsultationPrescription(){
    
  }
}
