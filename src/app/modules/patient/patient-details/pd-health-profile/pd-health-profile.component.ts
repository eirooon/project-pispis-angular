import { Component, OnInit } from '@angular/core';
import { Logger } from '../../../../shared/service/logger.service';

@Component({
  selector: 'pd-health-profile',
  templateUrl: './pd-health-profile.component.html',
  styleUrls: ['./pd-health-profile.component.css']
})
export class PdHealthProfileComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;

  constructor(
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
    this.logger.info(this.CLASSNAME, "ngOnInit", "Patient Health Profile Load");
  }

}
