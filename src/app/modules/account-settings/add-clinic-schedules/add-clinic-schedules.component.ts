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
  constructor(
    private location: Location
  ) { }

  ngOnInit() {
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

      //this.clinicScheduleModel.clinicScheduleList.
      var clinicScheduleObject = [{
        'clinicDay': this.clinicScheduleForm.value.clinicDay, 
        'clinicType': this.clinicScheduleForm.value.clinicType, 
        'startTime': this.clinicScheduleForm.value.startTime,
        'endTime': this.clinicScheduleForm.value.endTime
        }
      ];
      //check if object is in storage
      var stored = [];
      stored = JSON.parse(localStorage.getItem('testObject'));
      stored.push({
        'clinicDay': this.clinicScheduleForm.value.clinicDay, 
        'clinicType': this.clinicScheduleForm.value.clinicType, 
        'startTime': this.clinicScheduleForm.value.startTime,
        'endTime': this.clinicScheduleForm.value.endTime
        });

      // Put the object into storage
      localStorage.setItem('testObject', JSON.stringify(stored));
      console.log("addClinicSchedule" + this.clinicScheduleForm.value.clinicDay);
      this.location.back();
  }
}

}
