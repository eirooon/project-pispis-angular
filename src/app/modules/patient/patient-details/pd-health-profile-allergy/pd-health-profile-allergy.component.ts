import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pd-health-profile-allergy',
  templateUrl: './pd-health-profile-allergy.component.html',
  styleUrls: ['./pd-health-profile-allergy.component.css']
})
export class PdHealthProfileAllergyComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }
}
