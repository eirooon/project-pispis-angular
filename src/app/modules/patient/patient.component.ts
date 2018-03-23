import { Component, OnInit, HostListener} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Patient } from '../../shared/models/patient';
import { PatientService } from '../../shared/service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  myTitle = "Patient"
  public shadow: boolean = false;

  patients: Patient[];
  max: number = 8;
  first: boolean = true;

  constructor(
      private router: Router,
      private patientService: PatientService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
        console.log(this.router.url);
    });

    this.patientService.getPatients(this.max).subscribe(patients => { 
		//console.log(patients);
		this.patients = patients;
		
	});
  }

  loadMorePatient(){
    if(this.first){
      this.max = this.max + 3;
      this.first = false;
    }
    this.patientService.getPatients(this.max).subscribe(patients => { 
        //console.log(patients);
        this.patients = patients;
    });

    this.max = this.max + 3;
  }

//  @HostListener("window:scroll", ['$event'])
//  onWindowScroll($event) {
//      let number = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
//      if (number > 10) {
//          this.shadow = true;
//     } else if (this.shadow && number < 10) {
//          this.shadow = false;
//      }
//  }

  @HostListener("window:scroll", [])
  scroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log('bottom reached 123');
       // alert("End");
        this.loadMorePatient();
    }
  } 
  
}
