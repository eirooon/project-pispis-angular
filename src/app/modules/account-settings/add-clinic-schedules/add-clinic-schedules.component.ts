import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClinicScheduleModel } from '../../../shared/models/clinicScheduleModel';

@Component({
  selector: 'app-add-clinic-schedules',
  templateUrl: './add-clinic-schedules.component.html',
  styleUrls: ['./add-clinic-schedules.component.css']
})
export class AddClinicSchedulesComponent implements OnInit {

  clinicScheduleModel: ClinicScheduleModel;
  localList=[];
  constructor(
    private location: Location
  ) { }

  ngOnInit() {
    this.clinicScheduleModel = {
      clinicDay:'',
      clinicType:'',
      startTime:'',
      endTime:''
    }
  }

  clinicScheduleForm = new FormGroup({
        clinicDay : new FormControl('', Validators.required),
        clinicType : new FormControl('', Validators.required),
        startTime : new FormControl('', Validators.required),
        endTime: new FormControl('', Validators.required)
      }
  );

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

  addClinicSchedule(){
    console.log("addClinicSchedule");
    if(this.clinicScheduleForm.valid){
      console.log("addClinicSchedule");
      this.clinicScheduleForm.value.clinicDay;
      this.clinicScheduleForm.value.clinicType;
      this.clinicScheduleForm.value.startTime;
      this.clinicScheduleForm.value.endTime;

      this.clinicScheduleModel.clinicDay = this.clinicScheduleForm.value.clinicDay;
      this.clinicScheduleModel.clinicType =  this.clinicScheduleForm.value.clinicType;
      this.clinicScheduleModel.startTime =  this.clinicScheduleForm.value.startTime;
      this.clinicScheduleModel.endTime = this.clinicScheduleForm.value.endTime;
      //check if object is in storage
      var stored = [];
      stored = JSON.parse(localStorage.getItem('testObject'));
      this.localList.push(this.clinicScheduleModel); 
      stored =  this.localList;
      //stored.push(this.clinicScheduleModel);

      // Put the object into storage
      localStorage.setItem('testObject', JSON.stringify(stored));
      console.log("addClinicSchedule" + this.clinicScheduleForm.value.clinicDay);
      this.location.back();
  }
}

}
