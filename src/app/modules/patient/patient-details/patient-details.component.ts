import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { slideToRight, slideToLeft, fadeAnimation} from '../../../router.animations';
import { ConsultationService } from '../../../shared/service/consultation.service';
import { AuthService } from '../../../shared/service/auth.service';
import { PatientService } from '../../../shared/service/patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
  animations: [slideToLeft(), fadeAnimation(), slideToRight()],
  host: {'[@fadeAnimation]': ''}
})
export class PatientDetailsComponent implements OnInit {


  constructor(
    private location: Location,
    private consultationService: ConsultationService,
    private authService: AuthService,
    private patientService: PatientService 
  ) { }

  ngOnInit() {
  }


  goBack(){
    this.location.back();
  }
}
