import { Component, OnInit } from '@angular/core';
import { Logger } from '../../../../shared/service/logger.service';
import { AllergyService } from '../../../../shared/service/allergy.service';
import { MenstrualService } from '../../../../shared/service/menstrual.service';
import { Allergy } from '../../../../shared/models/allergyModel';
import { Menstrual } from '../../../../shared/models/menstrualModel';

@Component({
  selector: 'pd-health-profile',
  templateUrl: './pd-health-profile.component.html',
  styleUrls: ['./pd-health-profile.component.css']
})
export class PdHealthProfileComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;
  allergies: Allergy[];
  menstruals: Menstrual[];

  constructor(
    private logger: Logger,
    private allergyService: AllergyService,
    private menstrualService: MenstrualService,
  ) {
    this.loadAllergiesOfPatient();
    this.loadMenstrualOfPatient();
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
  }

  loadMenstrualOfPatient() {
    this.logger.info(this.CLASSNAME, "loadMenstrualOfPatient", "Patient Menstrual Load");
    this.menstrualService.getMenstruals().subscribe(menstruals => {
      if (menstruals.length > 0) {
        this.logger.info(this.CLASSNAME, "loadMenstrualOfPatient", "Patient Menstrual Retrieved");
        this.menstruals = menstruals;
      }
    },
      err => {
        this.logger.error(this.CLASSNAME, "loadMenstrualOfPatient", "Error: " + err.message);
      },
    );
  }

  loadAllergiesOfPatient() {
    this.logger.info(this.CLASSNAME, "loadAllergiesOfPatient", "Patient Allergies Load");
    this.allergyService.getAllergies().subscribe(allergies => {
      if (allergies.length > 0) {
        this.logger.info(this.CLASSNAME, "loadAllergiesOfPatient", "Patient List Retrieved");
        this.allergies = allergies;
      }
    },
      err => {
        this.logger.error(this.CLASSNAME, "loadAllergiesOfPatient", "Error: " + err.message);
      },
    );
  }

  setAllergyDetails(event, allergy: Allergy) {
    this.allergyService.setAllergy(allergy);
  }

  setMenstrualDetails(event, menstrual: Menstrual) {
    this.menstrualService.setMenstrual(menstrual);
  }

}
