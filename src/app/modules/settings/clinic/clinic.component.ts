import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormControl , Validators} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  form = new FormGroup({
    clinicname: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    address: new FormControl('', Validators.required),
    province: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    hospital: new FormControl('', Validators.required),
    roomnumber: new FormControl('', Validators.required)
  });

  constructor(private location: Location) { }

  ngOnInit() {
  }

  get clinicname(){
    return this.form.get('clinicname');
  }

  get address(){
    return this.form.get('address');
  }

  goBack(){
    this.location.back();
  }
}
