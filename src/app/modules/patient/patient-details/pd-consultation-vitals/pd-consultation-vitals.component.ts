import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pd-consultation-vitals',
  templateUrl: './pd-consultation-vitals.component.html',
  styleUrls: ['./pd-consultation-vitals.component.css']
})
export class PdConsultationVitalsComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
  }

  cancel(){
    this.router.navigateByUrl('/patient/patient-details');
  }
  
  goBack(){
    this.location.back();
  }
}
