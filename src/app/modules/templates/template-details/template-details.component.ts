import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.css']
})
export class TemplateDetailsComponent implements OnInit {
  details: Object[];
  constructor(
    private location: Location,
    private router: Router,
  ) { 
    this.ngOnInit();
  }
  
  tempForm = new FormGroup({
    patientname: new FormControl("", Validators.required),
    age: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
  })

  ngOnInit() {

  }

  goBack(){
    this.location.back();
  }

  onPreview(){ 
    localStorage.setItem( 'labdetails', JSON.stringify(this.tempForm.value) );
    // let userName = this.tempForm.controls['user'].value.name;
    // console.log(''+this.labRequest.patientname);
    console.log(this.tempForm.value);
    this.router.navigateByUrl('/templates/template-preview');


  }
}
