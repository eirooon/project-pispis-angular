import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pd-vital-signs-weight',
  templateUrl: './pd-vital-signs-weight.component.html',
  styleUrls: ['./pd-vital-signs-weight.component.css']
})
export class PdVitalSignsWeightComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
