import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Doctor } from '../../../shared/models/doctor';
import { DoctorService } from '../../../shared/service/doctor.service';
import { Logger } from '../../../shared/service/logger.service';

@Component({
  selector: 'app-doctors-profile',
  templateUrl: './doctors-profile.component.html',
  styleUrls: ['./doctors-profile.component.css']
})
export class DoctorsProfileComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;
  doctors: Doctor[];
  doctor: Doctor;

  constructor(
    private location: Location,
    private docService: DoctorService,
    private logger: Logger
  ) { }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.loadDoctor();
  }

  /**
   * Method: loadDoctor
   * Description: Load doctor
   * @return void
   */
  loadDoctor() {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Doctor: " + this.docService.getDoctor());
    this.docService.getDoctor().subscribe(ret => {
      setTimeout(() => {
        this.setDoctor(ret[0]);
      }, 500);
      this.logger.info(this.CLASSNAME, "ngOnInit", "Ret: " + ret);
      this.doctors = ret;
    });

  }

  /**
   * Method: setDoctor
   * Description: Set doctor
   * @param _doc 
   * @return void
   */
  setDoctor(_doc: Doctor) {
    this.doctor = {
      name: _doc.name,
      email: _doc.email,
      professionalRate: _doc.professionalRate,
    }

  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    // this.location.back();
  }
}
