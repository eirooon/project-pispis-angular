import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.css']
})
export class TemplateDetailsComponent implements OnInit {
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
