import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pd-consultation-selection',
  templateUrl: './pd-consultation-selection.component.html',
  styleUrls: ['./pd-consultation-selection.component.css']
})
export class PdConsultationSelectionComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }
}
