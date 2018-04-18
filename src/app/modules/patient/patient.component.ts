import { Component, OnInit, HostListener} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Patient } from '../../shared/models/patient';
import { PatientService } from '../../shared/service/patient.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  myTitle = "Patient"
  public shadow: boolean = false;
  state: string = '';

  patients: Patient[];
  max: number = 6;
  first: boolean = true;

  constructor(
      private router: Router,
      private patientService: PatientService,
      private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });

    this.patientService.getPatients(this.max).subscribe(patients => { 
		this.patients = patients;
    });
  }

  loadMorePatient(){
    this.spinner.show();
    if(this.first){
      this.max = this.max + 2;
      this.first = false;
    }
    this.patientService.getPatients(this.max).subscribe(patients => { 
        //console.log(patients);
        this.patients = patients;
    });

    this.max = this.max + 3;
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2500);
  }

  @HostListener("window:scroll", [])
  scroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log('bottom reached 123');
       // this.loadMorePatient();
    }
  } 
  
}
