import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClinicScheduleModel } from '../../../shared/models/clinicScheduleModel';
import { Logger } from '../../../shared/service/logger.service';

@Component({
  selector: 'app-add-clinic-schedules',
  templateUrl: './add-clinic-schedules.component.html',
  styleUrls: ['./add-clinic-schedules.component.css']
})
export class AddClinicSchedulesComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;

  clinicScheduleModel: ClinicScheduleModel;
  localList = [];

  constructor(
    private location: Location,
    private logger: Logger
  ) { }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.clinicScheduleModel = {
      clinicDay: '',
      clinicType: '',
      startTime: '',
      endTime: ''
    }
  }

  clinicScheduleForm = new FormGroup({
    clinicDay: new FormControl('', Validators.required),
    clinicType: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required)
  }
  );

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    this.location.back();
  }

  /**
   * Method: clinicDay
   * Description: Get clinic day
   * @return clinicDay
   */
  get clinicDay() {
    return this.clinicScheduleForm.get('clinicDay');
  }

  /**
   * Method: clinicType
   * Description: Get clinic type
   * @return clinicType
   */
  get clinicType() {
    return this.clinicScheduleForm.get('clinicType');
  }

  /**
   * Method: startType
   * Description: Get startTime
   * @return startTime
   */
  get startType() {
    return this.clinicScheduleForm.get('startTime');
  }

  /**
   * Method: endTime
   * Description: Get endTime
   * @return endTime
   */
  get endTime() {
    return this.clinicScheduleForm.get('endTime');
  }

  /**
   * Method: addClinicSchedule
   * Description: Add clinic schedule
   * @return vpid
   */
  addClinicSchedule() {
    if (this.clinicScheduleForm.valid) {
      this.clinicScheduleForm.value.clinicDay;
      this.clinicScheduleForm.value.clinicType;
      this.clinicScheduleForm.value.startTime;
      this.clinicScheduleForm.value.endTime;

      this.clinicScheduleModel.clinicDay = this.clinicScheduleForm.value.clinicDay;
      this.clinicScheduleModel.clinicType = this.clinicScheduleForm.value.clinicType;
      this.clinicScheduleModel.startTime = this.clinicScheduleForm.value.startTime;
      this.clinicScheduleModel.endTime = this.clinicScheduleForm.value.endTime;

      //check if object is in storage
      var stored = [];
      stored = JSON.parse(localStorage.getItem('testObject'));
      if (stored == null) {
        this.localList.push(this.clinicScheduleModel);
        stored = this.localList;
      }
      else {
        stored.push(this.clinicScheduleModel);
      }

      // Put the object into storage
      localStorage.setItem('testObject', JSON.stringify(stored));
      this.logger.info(this.CLASSNAME, "addClinicSchedule", "Clinic Day: " + this.clinicScheduleForm.value.clinicDay);
      this.location.back();
    }
  }

}
