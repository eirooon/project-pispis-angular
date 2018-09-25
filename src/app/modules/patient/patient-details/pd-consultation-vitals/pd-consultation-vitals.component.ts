import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Logger } from '../../../../shared/service/logger.service';

@Component({
  selector: 'app-pd-consultation-vitals',
  templateUrl: './pd-consultation-vitals.component.html',
  styleUrls: ['./pd-consultation-vitals.component.css']
})
export class PdConsultationVitalsComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;

  constructor(
    private location: Location,
    private router: Router,
    private logger: Logger
  ) { }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Consultation Vitals Load");
  }

  /**
   * Method: cancel
   * Description: Execute Cancel
   * @return void
   */
  cancel() {
    this.router.navigateByUrl('/patient/patient-details');
  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    this.location.back();
  }
}
