import { Component, OnInit } from '@angular/core';
import { Logger } from '../../shared/service/logger.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  myTitle = "Account Settings"
  CLASSNAME: string = this.constructor.name;

  constructor(
    private logger: Logger
  ) { 
    
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Initial Load");
  }

}
