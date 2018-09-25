import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Logger } from '../../../../shared/service/logger.service';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';

export interface IContext {
  data: string;
}

@Component({
  selector: 'app-pd-consultation-prescription',
  templateUrl: './pd-consultation-prescription.component.html',
  styleUrls: ['./pd-consultation-prescription.component.css']
})
export class PdConsultationPrescriptionComponent implements OnInit {
  @ViewChild('addPrescriptionModal')
  public modalTemplate: ModalTemplate<IContext, string, string>

  CLASSNAME: string = this.constructor.name;

  constructor(
    private location: Location,
    private router: Router,
    public modalService: SuiModalService,
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
  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    this.location.back();
  }

  /**
   * Method: openAddPrescriptionModal
   * Description: Open add prescription modal
   */
  public openAddPrescriptionModal() {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    config.mustScroll = true;
    config.size = 'normal';
    this.modalService
      .open(config)
      .onApprove(result => {
      })
      .onDeny(result => {
        this.logger.info(this.CLASSNAME, "openAddPrescriptionModal", "Cancel");
      });
  }
}
