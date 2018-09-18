import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pd-health-profile-selection',
  templateUrl: './pd-health-profile-selection.component.html',
  styleUrls: ['./pd-health-profile-selection.component.css']
})
export class PdHealthProfileSelectionComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }
}
