import { Component, OnInit, ViewChild } from '@angular/core';
import { IContext } from '../pd-vital-signs-weight/pd-vital-signs-weight.component';
import { TemplateModalConfig, SuiModalService, ModalTemplate } from 'ng2-semantic-ui';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { VitalSignsService } from '../../../../shared/service/vital-signs.service';
import { PatientService } from '../../../../shared/service/patient.service';
import { VitalsModel } from '../../../../shared/models/vitalsModel';
import { Logger } from '../../../../shared/service/logger.service';
import { Patient } from '../../../../shared/models/patientModel';

@Component({
  selector: 'app-pd-vitals-signs-heart-rate',
  templateUrl: './pd-vitals-signs-heart-rate.component.html',
  styleUrls: ['./pd-vitals-signs-heart-rate.component.css']
})
export class PdVitalsSignsHeartRateComponent implements OnInit {

  @ViewChild('addNewHeartRateModal')
  public addNewHeartRateModalTemplate: ModalTemplate<IContext, string, string>

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
  

  vitalsHeartRateForm = new FormGroup({
    datetime: new FormControl("", Validators.required),
    heartRate: new FormControl("", Validators.required),
  })


  /**
   * Method: date
   * Description: Get date
   * @return date
   */
  get date() {
    return this.vitalsHeartRateForm.get("datetime");
  }

  get heartRate() {
    return this.vitalsHeartRateForm.get("heartRate");
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

  public openAddNewHeartRateModal() {
    console.log("Open Add New HeartRate Modal");
    const config = new TemplateModalConfig<IContext, string, string>(this.addNewHeartRateModalTemplate);
    config.closeResult = "closed!";
    config.size = "tiny";

    this.modalService
      .open(config)
      .onApprove(result => {
        this.vitals.idPatient = this.patient.id;
        this.vitals.date = this.vitalsHeartRateForm.value.datetime;
        this.vitals.heartRate = this.vitalsHeartRateForm.value.heartRate;
        this.vitalsService.addVitals(this.vitals);
        this.logger.info(this.CLASSNAME, "openAddNewHeartRateModal", "Approve");
      })
      .onDeny(result => {
        this.logger.info(this.CLASSNAME, "openAddNewHeartRateModal", "Cancel");
      });
  }

}
