import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';

export interface IContext { 
  data:string;
}

@Component({
  selector: 'app-pd-consultation-prescription',
  templateUrl: './pd-consultation-prescription.component.html',
  styleUrls: ['./pd-consultation-prescription.component.css']
})
export class PdConsultationPrescriptionComponent implements OnInit {
  @ViewChild('addPrescriptionModal')
  public modalTemplate:ModalTemplate<IContext, string, string>

  constructor(
    private location: Location,
    private router: Router,
    public modalService:SuiModalService
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

  public openAddPrescriptionModal() {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    config.mustScroll = true;
    config.size = 'normal';
    this.modalService
        .open(config)
        .onApprove(result => { 
        })
        .onDeny(result => { 
          console.log("Cancel");
        });
  }
}
