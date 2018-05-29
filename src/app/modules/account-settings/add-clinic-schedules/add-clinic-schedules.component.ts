import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-clinic-schedules',
  templateUrl: './add-clinic-schedules.component.html',
  styleUrls: ['./add-clinic-schedules.component.css']
})
export class AddClinicSchedulesComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

}
