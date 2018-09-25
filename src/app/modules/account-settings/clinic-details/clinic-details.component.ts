import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ClinicService } from '../../../shared/service/clinic.service';
import { ClinicScheduleModel } from '../../../shared/models/clinicScheduleModel';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import { Logger } from '../../../shared/service/logger.service';

export interface IContext {
  data: string;
}

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.css']
})

export class ClinicDetailsComponent implements OnInit {
  @ViewChild('addClinicScheduleModalFromDetails')
  public modalTemplate: ModalTemplate<IContext, string, string>

  myTitle = "Clinic"
  CLASSNAME: string = this.constructor.name;

  clinicScheduleCollection: AngularFirestoreCollection<ClinicScheduleModel>;
  clinicSchedule: Observable<ClinicScheduleModel[]>;
  clinicScheduleDoc: AngularFirestoreDocument<ClinicScheduleModel>;
  hasList: boolean = false;
  state: string = '';
  clinicScheduleList: ClinicScheduleModel[];
  clinicScheduleItem: ClinicScheduleModel;

  constructor(
    private location: Location,
    public afs: AngularFirestore,
    private clinicService: ClinicService,
    public modalService: SuiModalService,
    private logger: Logger
  ) { }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.clinicService.getClinicsSchedule()
      .subscribe(item => {
        if (item.length > 0) {
          this.hasList = true;
          this.clinicScheduleList = item;
          this.logger.info(this.CLASSNAME, "ngOnInit", "ClinicSchedule data: " + this.clinicScheduleList);
        } else {
          this.hasList = false;
        }
      },
        err => {
          this.logger.info(this.CLASSNAME, "ngOnInit", "Error: " + err.message);
          this.hasList = false;
        },
    );
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
   * Method: openClinicScheduleFromDetails
   * Description: Open and view clinic schedules
   * @return void
   */
  public openClinicScheduleFromDetails() {
    console.log("OPEN CLINIC FROM DETAILS");
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    config.closeResult = "closed!";
    this.modalService
      .open(config)
      .onApprove(result => {
        this.addClinicSchedule();
      })
      .onDeny(result => {
        this.logger.info(this.CLASSNAME, "openClinicScheduleFromDetails", "Cancel");
      });
  }

  /**
   * Method: addClinicSchedule
   * Description: Add clinic schedule
   * @return void
   */
  addClinicSchedule() {

  }
}
