import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Logger } from '../../../../shared/service/logger.service';

@Component({
  selector: 'app-pd-consultation-selection',
  templateUrl: './pd-consultation-selection.component.html',
  styleUrls: ['./pd-consultation-selection.component.css']
})
export class PdConsultationSelectionComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;

  constructor(
    private location: Location,
    private router: Router,
    private logger: Logger
  ) {
    this.ngOnInit();
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Initial Load");
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
