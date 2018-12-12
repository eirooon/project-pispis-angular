import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateModalConfig, SuiModalService, ModalTemplate } from 'ng2-semantic-ui';
import { IContext } from '../../../account-settings/add-clinic/add-clinic.component';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { VitalSignsService } from '../../../../shared/service/vital-signs.service';
import { PatientService } from '../../../../shared/service/patient.service';
import { VitalsModel } from '../../../../shared/models/vitalsModel';
import { Patient } from '../../../../shared/models/patientModel';
import { Logger } from '../../../../shared/service/logger.service';

@Component({
  selector: 'app-pd-vitals-signs-oxygen-saturation',
  templateUrl: './pd-vitals-signs-oxygen-saturation.component.html',
  styleUrls: ['./pd-vitals-signs-oxygen-saturation.component.css']
})
export class PdVitalsSignsOxygenSaturationComponent implements OnInit {

  @ViewChild('addNewOxygenSaturationModal')
  public addNewOxygenSaturationModalTemplate: ModalTemplate<IContext, string, string>

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
  

  vitalsOxygenSaturationForm = new FormGroup({
    datetime: new FormControl("", Validators.required),
    oxygenSaturation: new FormControl("", Validators.required),
  })


  /**
   * Method: date
   * Description: Get date
   * @return date
   */
  get date() {
    return this.vitalsOxygenSaturationForm.get("datetime");
  }

  get oxygenSaturation() {
    return this.vitalsOxygenSaturationForm.get("oxygenSaturation");
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

  public openAddNewOxygenSaturationModal() {
    console.log("Open Add New OxygenSaturation Modal");
    const config = new TemplateModalConfig<IContext, string, string>(this.addNewOxygenSaturationModalTemplate);
    config.closeResult = "closed!";
    config.size = "tiny";

    this.modalService
      .open(config)
      .onApprove(result => {
        this.vitals.idPatient = this.patient.id;
        this.vitals.date = this.vitalsOxygenSaturationForm.value.datetime;
        this.vitals.oxygenSaturation = this.vitalsOxygenSaturationForm.value.oxygenSaturation;
        this.vitalsService.addVitals(this.vitals);
        this.logger.info(this.CLASSNAME, "openAddNewOxygenSaturationModal", "Approve");
      })
      .onDeny(result => {
        this.logger.info(this.CLASSNAME, "openAddNewOxygenSaturationModal", "Cancel");
      });
  }

}
