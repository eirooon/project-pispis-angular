import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';

export interface IContext {
  data: string;
}

@Component({
  selector: 'app-pd-vital-signs-weight',
  templateUrl: './pd-vital-signs-weight.component.html',
  styleUrls: ['./pd-vital-signs-weight.component.css']
})
export class PdVitalSignsWeightComponent implements OnInit {
  @ViewChild('addNewWeightModal') 
  public addNewWeightModalTemplate: ModalTemplate<IContext, string, string>

  constructor(
    private location: Location,
    private router: Router,
    public modalService: SuiModalService
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  public openAddNewWeightModal() {
    console.log("Open Add New Weight Modal");
    const config = new TemplateModalConfig<IContext, string, string>(this.addNewWeightModalTemplate);
    config.closeResult = "closed!";
    config.size = "tiny";

    this.modalService
      .open(config)
      .onApprove(result => {
        // this.addClinicSchedule();
        console.log("Open Add New Weight Modal: APPROVE");
      })
      .onDeny(result => {
        // this.logger.info(this.CLASSNAME, "openClinicScheduleFromDetails", "Cancel");
        console.log("Open Add New Weight Modal: DENY");
      });
  }
}
