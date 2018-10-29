import { Component, OnInit } from '@angular/core';
import { Logger } from '../../../../shared/service/logger.service';
import { AllergyService } from '../../../../shared/service/allergy.service';
import { Allergy } from '../../../../shared/models/allergyModel';

@Component({
  selector: 'pd-health-profile',
  templateUrl: './pd-health-profile.component.html',
  styleUrls: ['./pd-health-profile.component.css']
})
export class PdHealthProfileComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;
  allergies: Allergy[];

  constructor(
    private logger: Logger,
    private allergyService: AllergyService,
  ) {
    this.ngOnInit();
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Patient Allergies Load");
    this.allergyService.getAllergies().subscribe(patients => {
      if (patients.length > 0) {
        this.logger.info(this.CLASSNAME, "ngOnInit", "Patient List Retrieved");
        this.allergies = patients;
      }
    },
      err => {
        this.logger.error(this.CLASSNAME, "ngOnInit", "Error: " + err.message);
      },
    );
  }

}
