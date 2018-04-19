import { Component, OnInit, HostListener} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Patient } from '../../shared/models/patient';
import { PatientService } from '../../shared/service/patient.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  myTitle = "Patient"
  hasList: boolean = true;
  state: string = '';
  patients: Patient[];
  // max: number = 6;
  first: boolean = true;

  constructor(
      private router: Router,
      private patientService: PatientService,
      private ngProgress: NgProgress
  ) { 
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
    this.ngProgress.start();
    this.patientService.getPatients()
      .subscribe(patients => { 
        if(patients.length > 0){
          console.log('withlist');
          this.hasList = true;
          this.patients = patients;
        }else{
          this.hasList = false;
        }
        this.ngProgress.done();
    },
    err => {
      console.error('Oops:', err.message);
      this.hasList = false;
    },
    
  );
  }

  // loadMorePatient(){
  //   if(this.first){
  //     this.max = this.max + 2;
  //     this.first = false;
  //   }
  //   this.patientService.getPatients(this.max).subscribe(patients => { 
  //       //console.log(patients);
  //       this.patients = patients;
  //   });

  //   this.max = this.max + 3;
  //   setTimeout(() => {
  //     /** spinner ends after 5 seconds */
  //   }, 2500);
  // }

  @HostListener("window:scroll", [])
  scroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log('bottom reached 123');
       // this.loadMorePatient();
    }
  } 
  
}
