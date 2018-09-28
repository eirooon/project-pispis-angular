import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Clinic } from '../../../shared/models/clinicModel';
import { ClinicService } from '../../../shared/service/clinic.service';
import { Logger } from '../../../shared/service/logger.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  myTitle = "Clinic"
  CLASSNAME: string = this.constructor.name;

  clinicsCollection: AngularFirestoreCollection<Clinic>;
  clinic: Observable<Clinic[]>;
  clinicsDoc: AngularFirestoreDocument<Clinic>;
  hasList: boolean = true;
  state: string = '';
  clinics: Clinic[];

  constructor(
    private location: Location,
    public afs: AngularFirestore,
    private clinicService: ClinicService,
    private logger: Logger
  ) { }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.clinicService.getClinics()
      .subscribe(clinics => {
        if (clinics.length > 0) {
          this.hasList = true;
          this.clinics = clinics;
          this.logger.info(this.CLASSNAME, "ngOnInit", "Clinic data: " + this.clinics);
        } else {
          this.hasList = false;
        }
      },
        err => {
          this.logger.error(this.CLASSNAME, "ngOnInit", "Error: " + err.message);
          this.hasList = false;
        },
    );
  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    this.location.back();
  }

  /**
   * Method: setSelectedClinic
   * Description: Set selected clinic
   * @param idClinic 
   */
  setSelectedClinic(idClinic: Clinic) {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Clinic ID: " + idClinic.id);
    this.clinicService.setClinicID(idClinic.id);
    this.clinicService.setSelectedClinic(idClinic);
  }
}
