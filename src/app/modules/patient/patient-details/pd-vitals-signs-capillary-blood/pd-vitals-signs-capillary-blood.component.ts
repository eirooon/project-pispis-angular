import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateModalConfig, SuiModalService, ModalTemplate } from 'ng2-semantic-ui';
import { IContext } from '../../../account-settings/add-clinic/add-clinic.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from '../../../../shared/service/patient.service';
import { VitalSignsService } from '../../../../shared/service/vital-signs.service';
import { VitalsModel } from '../../../../shared/models/vitalsModel';
import { Logger } from '../../../../shared/service/logger.service';
import { Patient } from '../../../../shared/models/patientModel';

@Component({
  selector: 'app-pd-vitals-signs-capillary-blood',
  templateUrl: './pd-vitals-signs-capillary-blood.component.html',
  styleUrls: ['./pd-vitals-signs-capillary-blood.component.css']
})
export class PdVitalsSignsCapillaryBloodComponent implements OnInit {
  @ViewChild('addNewCapillaryBloodGlucoseModal')
  public addNewCapillaryBloodGlucoseModalTemplate: ModalTemplate<IContext, string, string>

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
  

  vitalsCapillaryBloodGlucoseForm = new FormGroup({
    datetime: new FormControl("", Validators.required),
    capillaryBloodGlucose: new FormControl("", Validators.required),
  })


  /**
   * Method: date
   * Description: Get date
   * @return date
   */
  get date() {
    return this.vitalsCapillaryBloodGlucoseForm.get("datetime");
  }

  get capillaryBloodGlucose() {
    return this.vitalsCapillaryBloodGlucoseForm.get("capillaryBloodGlucose");
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

  public openAddNewCapillaryBloodGlucoseModal() {
    console.log("Open Add New CapillaryBloodGlucose Modal");
    const config = new TemplateModalConfig<IContext, string, string>(this.addNewCapillaryBloodGlucoseModalTemplate);
    config.closeResult = "closed!";
    config.size = "tiny";

    this.modalService
      .open(config)
      .onApprove(result => {
        this.vitals.idPatient = this.patient.id;
        this.vitals.date = this.vitalsCapillaryBloodGlucoseForm.value.datetime;
        this.vitals.capillaryBloodGlucose = this.vitalsCapillaryBloodGlucoseForm.value.capillaryBloodGlucose;
        this.vitalsService.addVitals(this.vitals);
        this.logger.info(this.CLASSNAME, "openAddNewCapillaryBloodGlucoseModal", "Approve");
      })
      .onDeny(result => {
        this.logger.info(this.CLASSNAME, "openAddNewCapillaryBloodGlucoseModal", "Cancel");
      });
  }

}
