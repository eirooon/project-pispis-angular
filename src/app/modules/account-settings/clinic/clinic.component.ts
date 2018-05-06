import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {
  myTitle = "Clinic"
  constructor(private location: Location) { }

  ngOnInit() {
  }
  
  goBack(){
    this.location.back();
  }

}
