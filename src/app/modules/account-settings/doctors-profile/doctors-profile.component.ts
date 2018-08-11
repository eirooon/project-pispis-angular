import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-doctors-profile',
  templateUrl: './doctors-profile.component.html',
  styleUrls: ['./doctors-profile.component.css']
})
export class DoctorsProfileComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }


  goBack(){
    this.location.back();
  }
}
