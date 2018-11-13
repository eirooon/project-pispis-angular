import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Logger } from '../../../../shared/service/logger.service';
import { MenstrualService } from '../../../../shared/service/menstrual.service';
import { Menstrual } from '../../../../shared/models/menstrualModel';

@Component({
  selector: 'app-pd-health-profile-selection',
  templateUrl: './pd-health-profile-selection.component.html',
  styleUrls: ['./pd-health-profile-selection.component.css']
})
export class PdHealthProfileSelectionComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;
  menstrual: Menstrual;

  constructor(
    private location: Location,
    private logger: Logger,
    private menstrualService: MenstrualService,
  ) {
    this.ngOnInit();
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Patient Health Profile Load");
  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    this.location.back();
  }

  setMenstrualDetails(event){
    // this.menstrual = this.menstrualService.getMenstrualInformationByPatientId();
    // this.menstrualService.setMenstrual(this.menstrual);
  }
}
