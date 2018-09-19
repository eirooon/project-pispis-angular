import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConsultationTextModel } from '../../../../shared/models/consulationModel';
import { ConsultationService } from '../../../../shared/service/consultation.service';
import { AuthService } from '../../../../shared/service/auth.service';
import { ClinicService } from '../../../../shared/service/clinic.service';
import { Clinic } from '../../../../shared/models/clinicModel';
import { Patient } from '../../../../shared/models/patient';
import { PatientService } from '../../../../shared/service/patient.service';


@Component({
  selector: 'app-pd-consultation-text',
  templateUrl: './pd-consultation-text.component.html',
  styleUrls: ['./pd-consultation-text.component.css']
})
export class PdConsultationTextComponent implements OnInit {

  consultationText: ConsultationTextModel;
  clinicsList: Clinic[];
  patient: Patient;

  constructor(
    private location: Location,
    private router: Router,
    private consultationService: ConsultationService,
    private authService: AuthService,
    private clinicService: ClinicService,
    private patientService: PatientService,
  ) {
    console.log("PdConsultationTextComponent");
    this.patient = this.patientService.getPatient();
    console.log(this.patient);
   }


  consultationForm = new FormGroup({
    clinicname: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    text: new FormControl("", Validators.required),
    patientType: new FormControl("", Validators.required)
  })
  

  ngOnInit() {   
    this.initializeConsultation();
    this.clinicService.getClinics().subscribe(clinics => {
      if (clinics.length > 0) {
        console.log('[Clinic] List loaded successful');
        this.clinicsList = clinics;
        console.log('[Clinic] Clinic data: ' + this.clinicsList);
      }
    },
      err => {
        console.error('[Clinic] Error: ', err.message);
      },
  );
  }
  cancel(){
    this.router.navigateByUrl('/patient/patient-details');
  }
  goBack(){
    this.location.back();
  }
  addText(){
    this.router.navigateByUrl('/patient/patient-details');
  }

  get clinicname(){
    return this.consultationForm.get("clinicname");
  }

  get date(){
    return this.consultationForm.get("date");
  }

  get text(){
    return this.consultationForm.get("text");
  }

  get patientType(){
    return this.consultationForm.get("patientType")
  }

  initializeConsultation(){
    this.consultationText = {
      id:'',
      idPatient: '',
      clinicname: '',
      text:'',
      date:'',
      type:'',
      patientType:''
    }
  }

  // Add consultation of type Text with specific Patient ID
  addConsultationText(){
      if(this.consultationForm.valid){
        console.log("addConsultationText" + this.clinicname);
        this.consultationText.type = "Text";
        this.consultationText.idPatient =  this.patient.id;
        this.consultationText.clinicname = this.consultationForm.value.clinicname,
        this.consultationText.date =  this.consultationForm.value.date;
        this.consultationText.text = this.consultationForm.value.text;
        this.consultationText.patientType = this.consultationForm.value.patientType;
        this.consultationService.addConsultationText(this.consultationText);
        this.location.back();
        console.log('[Add Consultation]] Adding Successful');
      }else {
      console.log('[Add Consultation] Error: Form is invalid');
    }  
  }

  addConsultationPrescription(){
    // add code here
  }

  
}
