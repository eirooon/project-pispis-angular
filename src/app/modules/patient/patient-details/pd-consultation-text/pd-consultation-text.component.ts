import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConsultationTextModel } from '../../../../shared/models/consulationModel';
import { ConsultationService } from '../../../../shared/service/consultation.service';
import { AuthService } from '../../../../shared/service/auth.service';

@Component({
  selector: 'app-pd-consultation-text',
  templateUrl: './pd-consultation-text.component.html',
  styleUrls: ['./pd-consultation-text.component.css']
})
export class PdConsultationTextComponent implements OnInit {

  consultationText: ConsultationTextModel;

  constructor(
    private location: Location,
    private router: Router,
    private consultationService: ConsultationService,
    private authService: AuthService
  ) { }


  consultationForm = new FormGroup({
    clinicname: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    text: new FormControl("", Validators.required),
  })
  

  ngOnInit() {
    this.initializeConsultation();
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

  initializeConsultation(){
    this.consultationText = {
      id:'',
      idDoc: this.authService.getUidOfCurrentDoctor(),
      clinicname: '',
      text:'',
      date:''
    }
  }
  addConsultationText(){
    if(this.consultationForm.valid){
      console.log("addConsultationText" + this.clinicname);
      this.consultationText.idDoc = this.authService.getUidOfCurrentDoctor(),
      this.consultationText.clinicname = this.consultationForm.value.clinicname,
      this.consultationText.date =  this.consultationForm.value.date;
      this.consultationText.text = this.consultationForm.value.text;
      this.consultationService.addConsultationText(this.consultationText);
      this.router.navigateByUrl('/patient');
      console.log('[Add Consultation]] Adding Successful');
    }else {
    console.log('[Add Consultation] Error: Form is invalid');
  }
    
  }
}
