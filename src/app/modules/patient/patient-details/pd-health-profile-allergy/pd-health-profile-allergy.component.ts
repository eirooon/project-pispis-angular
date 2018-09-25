import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Logger } from '../../../../shared/service/logger.service';

@Component({
  selector: 'app-pd-health-profile-allergy',
  templateUrl: './pd-health-profile-allergy.component.html',
  styleUrls: ['./pd-health-profile-allergy.component.css']
})
export class PdHealthProfileAllergyComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;

  constructor(
    private location: Location,
    private logger: Logger
  ) { }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Patient Health Profile Allergy Load");
  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    this.logger.debug(this.CLASSNAME, "goBack", "BACK!");
    //this.location.back();
  }

  sampppppp() {
    this.logger.debug(this.CLASSNAME, "goBack", "BACK!");
    //this.location.back();
  }
}
