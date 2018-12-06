import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VitalSignsService } from '../../../../shared/service/vital-signs.service';
import * as _ from 'lodash';
import { VitalsModel } from '../../../../shared/models/vitalsModel';
import { Logger } from '../../../../shared/service/logger.service';
import { PatientService } from '../../../../shared/service/patient.service';
import { Patient } from '../../../../shared/models/patientModel';

@Component({
  selector: 'pd-vital-signs',
  templateUrl: './pd-vital-signs.component.html',
  styleUrls: ['./pd-vital-signs.component.css']
})
export class PdVitalSignsComponent implements OnInit {
  @ViewChild('weightChart') weight: ElementRef;
  @ViewChild('heightChart') height: ElementRef;

  CLASSNAME: string = this.constructor.name;
  vitalsCollection: VitalsModel[];
  hasList: Boolean;
 
  //weightData: String[];

  // Vitals
  patient: Patient;
  weightData = "";
  heightData = "";
  bloodPressureData ="";
  oxygenSaturationData ="";
  respiratoryRateData ="";
  heartRateData = "";
  bodyTempData = "";
  headCircumData = "";
  capillaryBloodGlucData = "";

  // Date
  weightDate; 
  heightDate;
  bloodPressureDate;
  oxygenSaturationDate;
  respiratoryRateDate;
  heartRateDate;
  bodyTempDate;
  headCircumDate;
  capillaryBloodGlucDate;

  vitals: VitalsModel;

  constructor(
    private vitalsService: VitalSignsService,
    private logger: Logger,
    private patientService: PatientService
    ) {
      this.logger.info(this.CLASSNAME, "ngOnInit", "Initial Load");
      this.patient = this.patientService.getPatientById();
      this.logger.info(this.CLASSNAME, "ngOnInit", "Initial Load" + this.patient);
    }

  ngOnInit() {
    this.initializeVitals();
    this.vitalsService.getVitals(localStorage.getItem("ptId"))
    .subscribe(consultations => {
      if (consultations.length > 0) {
        this.hasList = true;
        this.vitalsCollection = consultations;
        this.vitalsCollection.reverse();
        this.logger.info(this.CLASSNAME, "ngOnInit", "Vitals data: [" + this.vitalsCollection + "] List Loaded");

        for(let vitalsData of this.vitalsCollection){
          if(this.weightData == ""){
            this.weightData = vitalsData.weight;
            this.weightDate = vitalsData.date;
          }

          if(this.heightData == ""){
            this.heightData = vitalsData.height;
            this.heightDate = vitalsData.date;
          }

          if(this.bloodPressureData == ""){
            this.bloodPressureData = vitalsData.bloodPressure;
            this.bloodPressureDate = vitalsData.date;
          }

          if(this.oxygenSaturationData == ""){
            this.oxygenSaturationData = vitalsData.oxygenSaturation;
            this.oxygenSaturationDate = vitalsData.date;
          }

          if(this.respiratoryRateData == ""){
            this.respiratoryRateData = vitalsData.respiratoryRate;
            this.respiratoryRateDate = vitalsData.date;
          }

          if(this.heartRateData == ""){
            this.heartRateData = vitalsData.heartRate;
            this.heartRateDate = vitalsData.date;
          }

          if(this.bodyTempData == ""){
            this.bodyTempData = vitalsData.bodyTemperature;
            this.bodyTempDate = vitalsData.date;
          }

          if(this.headCircumData == ""){
            this.headCircumData = vitalsData.headCircumference;
            this.headCircumDate = vitalsData.date;
          }

          if(this.capillaryBloodGlucData == ""){
            this.capillaryBloodGlucData = vitalsData.capillaryBloodGlucose;
            this.capillaryBloodGlucDate = vitalsData.date;
          }

          this.logger.info(this.CLASSNAME, "headCircumData", vitalsData.headCircumference);
          this.logger.info(this.CLASSNAME, "heightData", vitalsData.height);
          this.logger.info(this.CLASSNAME, "weightItem", this.weightData);
        }
        // this.initWeightChart();
        // this.initHeightChart();
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

  // initWeightChart(){
  //   const weight = this.weight.nativeElement;
  //   var dateTime = [];
  //   var weightData = [];
  //   for(let vitalsWeight of this.vitalsCollection){
  //     dateTime.push(vitalsWeight.date)
  //     weightData.push(vitalsWeight.weight);
  //     console.log(vitalsWeight.date );
  //     console.log(vitalsWeight.weight);
  //   }

  //   const w_data = [{
  //     type: 'line',
  //     x: dateTime /*['2000-01-01', '2001-0-02', '2002-01-03', '2003-01-04', '2004-03-05', '2006-02-06', '2007-01-07', '2008-01-08', '2009-01-09', '2010-01-10'*/,
  //     y: weightData/*[70, 75, 80, 78, 85, 87, 89, 90, 92, 88]*/,
  //     marker: {
  //       color: '#172B4D'
  //   }
  //   }]

  //   const w_layout = {
  //     margin: { 
  //       t:15,
  //       l:30,
  //       b:30,
  //       r:30
  //     },
  //     autosize: true
  //   }

  //   Plotly.plot(weight,w_data,w_layout,{
  //     responsive: true, 
  //     displayModeBar: false
  //   });
    
  // }
  // initHeightChart(){
  //   const height = this.height.nativeElement;

  //   const h_data = [{
  //     type: 'line',
  //     x: ['2000-01-01', '2001-0-02', '2002-01-03', '2003-01-04', '2004-03-05', '2006-02-06', '2007-01-07', '2008-01-08', '2009-01-09', '2010-01-10'],
  //     y: [70, 75, 80, 78, 85, 87, 89, 90, 92, 88],
  //     marker: {
  //       color: '#172B4D'
  //   }
  //   }]

  //   const h_layout = {
  //     margin: { 
  //       t:15,
  //       l:15,
  //       b:15,
  //       r:15
  //     },
  //   }

  //   Plotly.plot(height,h_data,h_layout,{
  //     responsive: true, 
  //     displayModeBar: false
  //   });
  // }

}
