import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pd-health-profile-menstrual-history',
  templateUrl: './pd-health-profile-menstrual-history.component.html',
  styleUrls: ['./pd-health-profile-menstrual-history.component.css']
})
export class PdHealthProfileMenstrualHistoryComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }


}
