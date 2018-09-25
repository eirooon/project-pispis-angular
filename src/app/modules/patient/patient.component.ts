import { Component, OnInit, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Patient } from '../../shared/models/patient';
import { PatientService } from '../../shared/service/patient.service';
import { Logger } from '../../shared/service/logger.service';
import { NgProgress } from 'ngx-progressbar';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  myTitle = "Patients"
  hasList: boolean = true;
  patients: Patient[];

  startAt = new Subject();
  endAt = new Subject();

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  CLASSNAME: string = this.constructor.name;

  constructor(
    private router: Router,
    private patientService: PatientService,
    private ngProgress: NgProgress,
    public afs: AngularFirestore,
    private logger: Logger
  ) {

  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.ngProgress.start();

    this.patientService.getPatients().subscribe(patients => {
      if (patients.length > 0) {
        this.logger.info(this.CLASSNAME, "ngOnInit", "Patient List Retrieved");
        this.hasList = true;
        this.patients = patients;
      } else {
        this.hasList = false;
      }
      this.ngProgress.done();
    },
      err => {
        this.logger.error(this.CLASSNAME, "ngOnInit", "Error: " + err.message);
        this.hasList = false;
      },
    );

    Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((patients) => {
        this.patients = patients;
      })
    })
  }

  /**
   * Method: search
   * Description: Search Patient 
   * @param  event
   */
  search($event) {
    let q = $event.target.value;
    if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
      this.patientService.getPatients().subscribe(patients => {
        this.patients = patients;
      })
    }
  }

  /**
   * Method: firequery
   * Description: Fires the start and end of search query
   * @param start 
   * @param end 
   * @return loadSearchPatients
   */
  firequery(start, end) {
    return this.patientService.loadSearchPatients(start, end);
  }

  /**
   * Method: setPatientDetails
   * Description: Sets patients details 
   * @param event 
   * @param patient 
   * @return void
   */
  setPatientDetails(event, patient) {
    this.patientService.setPatient(patient);
  }

  /**
   * Method: deletePatient
   * Description: Delete patients details 
   * @param event 
   * @param patient 
   */
  deletePatient(event, patient) {
    this.patientService.deletePatient(patient);
  }

  @HostListener("window:scroll", [])
  scroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // this.loadMorePatient();
    }
  }

}
