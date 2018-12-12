import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateModalConfig, SuiModalService, ModalTemplate } from 'ng2-semantic-ui';
import { IContext } from '../../../account-settings/add-clinic/add-clinic.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Logger } from '../../../../shared/service/logger.service';
import { VitalSignsService } from '../../../../shared/service/vital-signs.service';
import { PatientService } from '../../../../shared/service/patient.service';
import { VitalsModel } from '../../../../shared/models/vitalsModel';
import { Patient } from '../../../../shared/models/patientModel';

@Component({
  selector: 'app-pd-vitals-signs-head-circumference',
  templateUrl: './pd-vitals-signs-head-circumference.component.html',
  styleUrls: ['./pd-vitals-signs-head-circumference.component.css']
})
export class PdVitalsSignsHeadCircumferenceComponent implements OnInit {

  @ViewChild('addNewHeadCircumferenceModal')
  public addNewHeadCircumferenceModalTemplate: ModalTemplate<IContext, string, string>

  CLASSNAME: string = this.constructor.name;
  vitals: VitalsModel;
  patient: Patient;
  hasList: Boolean;
  vitalsCollection: VitalsModel[];
  constructor(
    private logger: Logger,
    public modalService: SuiModalService,
    private vitalsService: VitalSignsService,
    private patientService: PatientService,
  ) {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Initial Load");
    this.patient = this.patientService.getPatientById();
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.initializeVitals();
    this.logger.info(this.CLASSNAME, "ngOnInit", "Vitals Load");

    this.vitalsService.getVitals(this.patient.id)
      .subscribe(consultations => {
        if (consultations.length > 0) {
          this.hasList = true;
          this.vitalsCollection = consultations;
          this.logger.info(this.CLASSNAME, "ngOnInit", "Vitals data: [" + this.vitalsCollection + "] List Loaded");
          
        } else {
          this.hasList = false;
        }
      },
        err => {
          this.logger.info(this.CLASSNAME, "ngOnInit", "Error: " + err.message);
          this.hasList = false;
        },
      );
  }
  

  vitalsHeadCircumferenceForm = new FormGroup({
    datetime: new FormControl("", Validators.required),
    headCircumference: new FormControl("", Validators.required),
  })


  /**
   * Method: date
   * Description: Get date
   * @return date
   */
  get date() {
    return this.vitalsHeadCircumferenceForm.get("datetime");
  }

  get headCircumference() {
    return this.vitalsHeadCircumferenceForm.get("headCircumference");
  }


  goBack() {
    //this.location.back();
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

  public openAddNewHeadCircumferenceModal() {
    console.log("Open Add New HeadCircumference Modal");
    const config = new TemplateModalConfig<IContext, string, string>(this.addNewHeadCircumferenceModalTemplate);
    config.closeResult = "closed!";
    config.size = "tiny";

    this.modalService
      .open(config)
      .onApprove(result => {
        this.vitals.idPatient = this.patient.id;
        this.vitals.date = this.vitalsHeadCircumferenceForm.value.datetime;
        this.vitals.headCircumference = this.vitalsHeadCircumferenceForm.value.headCircumference;
        this.vitalsService.addVitals(this.vitals);
        this.logger.info(this.CLASSNAME, "openAddNewHeadCircumferenceModal", "Approve");
      })
      .onDeny(result => {
        this.logger.info(this.CLASSNAME, "openAddNewHeadCircumferenceModal", "Cancel");
      });
  }
}
