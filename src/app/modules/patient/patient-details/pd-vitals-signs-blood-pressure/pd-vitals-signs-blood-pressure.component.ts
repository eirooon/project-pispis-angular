import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateModalConfig, SuiModalService, ModalTemplate } from 'ng2-semantic-ui';
import { IContext } from '../../../account-settings/add-clinic/add-clinic.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { VitalSignsService } from '../../../../shared/service/vital-signs.service';
import { PatientService } from '../../../../shared/service/patient.service';
import { Logger } from '../../../../shared/service/logger.service';
import { VitalsModel } from '../../../../shared/models/vitalsModel';
import { Patient } from '../../../../shared/models/patientModel';

@Component({
  selector: 'app-pd-vitals-signs-blood-pressure',
  templateUrl: './pd-vitals-signs-blood-pressure.component.html',
  styleUrls: ['./pd-vitals-signs-blood-pressure.component.css']
})
export class PdVitalsSignsBloodPressureComponent implements OnInit {
  @ViewChild('addNewBloodPressureModal')
  public addNewBloodPressureModalTemplate: ModalTemplate<IContext, string, string>

  CLASSNAME: string = this.constructor.name;
  vitals: VitalsModel;
  patient: Patient;
  hasList: Boolean;
  vitalsCollection: VitalsModel[];
  constructor(
    private location: Location,
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

    this.vitalsService.getVitals(localStorage.getItem("ptId"))
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
  

  vitalsBloodPressureForm = new FormGroup({
    datetime: new FormControl("", Validators.required),
    bloodPressure: new FormControl("", Validators.required),
  })


  /**
   * Method: date
   * Description: Get date
   * @return date
   */
  get date() {
    return this.vitalsBloodPressureForm.get("datetime");
  }

  get bloodPressure() {
    return this.vitalsBloodPressureForm.get("bloodPressure");
  }


  goBack() {
   // this.location.();
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

  public openAddNewBloodPressureModal() {
    console.log("Open Add New BloodPressure Modal");
    const config = new TemplateModalConfig<IContext, string, string>(this.addNewBloodPressureModalTemplate);
    config.closeResult = "closed!";
    config.size = "tiny";

    this.modalService
      .open(config)
      .onApprove(result => {
        this.vitals.idPatient = this.patient.id;
        this.vitals.date = this.vitalsBloodPressureForm.value.datetime;
        this.vitals.bloodPressure = this.vitalsBloodPressureForm.value.bloodPressure;
        this.vitalsService.addVitals(this.vitals);
        this.logger.info(this.CLASSNAME, "openAddNewBloodPressureModal", "Approve");
      })
      .onDeny(result => {
        this.logger.info(this.CLASSNAME, "openAddNewBloodPressureModal", "Cancel");
      });
  }
}
