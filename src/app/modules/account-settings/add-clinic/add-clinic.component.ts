import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,  FormControl , Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../../shared/service/auth.service';
import { AllProvince } from '../../../shared/constantValues/provinceConstants';
import { AllCity } from '../../../shared/constantValues/cityConstants';
import { AllHospitals } from '../../../shared/constantValues/hospitalConstants';
import { Router} from '@angular/router';
import { ClinicScheduleModel} from '../../../shared/models/clinicScheduleModel';
import {Clinic} from '../../../shared/models/clinicModel';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import { AllDaysOfTheWeek } from '../../../shared/constantValues/daysOfTheWeekConstants';
export interface IContext { 
  data:string;
}

@Component({
  selector: 'app-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.css'],
})

export class AddClinicComponent implements OnInit {
  @ViewChild('addClinicScheduleModal')
  public modalTemplate:ModalTemplate<IContext, string, string>

  
  provinceList = AllProvince;
  cityList = AllCity;
  hospitalList = AllHospitals;
  clinicSchedules:any={};
  clinicSchedulesList : ClinicScheduleModel[];
  clinic: Clinic;
  daysOfTheWeekList = AllDaysOfTheWeek;
  
  clinicScheduleModel: ClinicScheduleModel;
  localList=[];


  clinicCollection: AngularFirestoreCollection<any> = this.afs.collection('clinics');

  ptnObserver = this.clinicCollection.valueChanges();

  
  
  clinicForm = new FormGroup({
    clinicname: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    phone: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    city: new FormControl('',Validators.required),
    hospital: new FormControl('', Validators.required),
    roomnumber: new FormControl('', Validators.required),
  });

  clinicScheduleForm = new FormGroup({
    clinicDay : new FormControl('', Validators.required),
    clinicType : new FormControl('', Validators.required),
    startTime : new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required)
  }
);


  constructor(
    private location: Location,
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    public modalService:SuiModalService) { }

  ngOnInit() {
    this.clinic = {
      idDoc:'',
      clinicname:'',
      province:'',
      city:'',
      hospital:'',
      roomnumber:'',
    }

    this.clinicScheduleModel = {
      clinicDay:'',
      clinicType:'',
      startTime:'',
      endTime:''
    }
    this.daysOfTheWeekList = AllDaysOfTheWeek;
  }

  get clinicname(){
    return this.clinicForm.get('clinicname');
  }

  get address(){
    return this.clinicForm.get('address');
  }

  get province(){
    return this.clinicForm.get('province');
  }

  get city(){
    return this.clinicForm.get('city');
  }

  get hospital(){
    return this.clinicForm.get('hospital');
  }

  get roomnumber(){
    return this. clinicForm.get('roomnumber');
  }

  goBack(){
    this.location.back();
  }

  get clinicDay(){
    return this.clinicScheduleForm.get('clinicDay');
  }

  get clinicType(){
    return this.clinicScheduleForm.get('clinicType');
  }

  get startType(){
    return this.clinicScheduleForm.get('startTime');
  }

  get endTime(){
    return this.clinicScheduleForm.get('endTime');
  }


  addClinic(){
    console.log('addClinic()');
    if(this.clinicForm.valid){
      this.clinicCollection.add({
        idDoc: this.authService.getUidOfCurrentDoctor(),
        clinicname: this.clinicForm.value.clinicname,
        province: this.clinicForm.value.province,
        city: this.clinicForm.value.city,
        hospital: this.clinicForm.value.hospital,
        roomnumber: this.clinicForm.value.roomnumber,
      })
      .then((docRef) => {
        this.clinicCollection.doc(docRef.id).update({
          prodid: docRef.id
        })
        if(this.clinicSchedulesList){
        this.clinicSchedulesList.forEach(element => {
          console.log('Add Clinic Schedule element:' + element);
          this.afs.collection('clinics').doc(docRef.id).collection('clinicSchedule').add({
            clinicSchedule:  element
          })
        });
      }
      
        console.log('Clinic schedule list:' + this.clinicSchedulesList);
        console.log('[Clinic-Add] Doc Ref: ' + docRef.id);
        this.goBack();
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    }else {
    console.log('[Clinic-Add] Form is invalid');
    }

    
  }

 
  public openClinicSchedule() {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.closeResult = "closed!";
    
    this.modalService
        .open(config)
        .onApprove(result => { 
          console.log("OK");
          this.addClinicSchedule();
        })
        .onDeny(result => { 
          console.log("Cancel");
        });
  }

  addClinicSchedule(){
    console.log("addClinicSchedule");
    if(this.clinicScheduleForm.valid){
      //check if object is in storage
      var stored = [];
      console.log("addClinicSchedule");
      this.clinicScheduleModel = {
        clinicDay:'',
        clinicType:'',
        startTime:'',
        endTime:''
      }
      this.clinicScheduleModel.clinicDay = this.clinicScheduleForm.value.clinicDay;
      this.clinicScheduleModel.clinicType =  this.clinicScheduleForm.value.clinicType;
      this.clinicScheduleModel.startTime =  this.clinicScheduleForm.value.startTime;
      this.clinicScheduleModel.endTime = this.clinicScheduleForm.value.endTime;
      this.localList.push(this.clinicScheduleModel);
      this.clinicSchedulesList = this.localList;
      console.log(this.clinicSchedulesList);
      this.removeDocument( this.clinicScheduleModel.clinicDay);
      this.resetForm();
    }
  }

  removeDocument(doc){
    console.log(doc);
    this.daysOfTheWeekList.forEach( (item, index) => {
      if(item.day == doc) {
        this.daysOfTheWeekList.splice(index,1);
      }
    });
 }

 resetForm(){
   console.log("resetForm()");
  this.clinicScheduleForm.reset();
 }
}