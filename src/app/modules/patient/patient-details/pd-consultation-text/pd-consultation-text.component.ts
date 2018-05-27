import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pd-consultation-text',
  templateUrl: './pd-consultation-text.component.html',
  styleUrls: ['./pd-consultation-text.component.css']
})
export class PdConsultationTextComponent implements OnInit {

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
  addText(){
    this.router.navigateByUrl('/patient/patient-details');
  }
}
