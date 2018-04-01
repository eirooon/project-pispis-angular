import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { slideToRight, slideToLeft, fadeAnimation} from '../../../router.animations';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
  animations: [slideToLeft(), fadeAnimation(), slideToRight()],
  host: {'[@fadeAnimation]': ''}
})
export class PatientDetailsComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }
}
