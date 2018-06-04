import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/service/validation.service';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.css']
})
export class TemplateDetailsComponent implements OnInit {
  tempForm: any;
  details: Object[];
  constructor(
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.ngOnInit();
  }

  ngOnInit() {
    this.tempForm = this.formBuilder.group({
      patientname:['', Validators.required],
      age:['', [Validators.required, Validators.minLength(3)]],
      gender:['', Validators.required],
      address:['', Validators.required],
      // hematology:[''],
      // chemistry:[''],
      // serology:[''],
      // tumor_makers:[''],
    });
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
