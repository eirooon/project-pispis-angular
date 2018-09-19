import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ClinicService } from '../../../shared/service/clinic.service';
import { ClinicScheduleModel } from '../../../shared/models/clinicScheduleModel';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';

export interface IContext { 
  data:string;
}

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.css']
})

export class ClinicDetailsComponent implements OnInit {
  @ViewChild('addClinicScheduleModalFromDetails')
  public modalTemplate:ModalTemplate<IContext, string, string>
 
  clinicScheduleCollection: AngularFirestoreCollection<ClinicScheduleModel>;
  clinicSchedule: Observable<ClinicScheduleModel[]>;
  clinicScheduleDoc: AngularFirestoreDocument<ClinicScheduleModel>;
  hasList: boolean = false;
  state: string = '';
  clinicScheduleList: ClinicScheduleModel[];
  clinicScheduleItem : ClinicScheduleModel;

  myTitle = "Clinic"
  constructor(
    private location: Location,
    public afs: AngularFirestore,
    private clinicService: ClinicService,
    public modalService:SuiModalService
  ) { }

  ngOnInit() {
    this.clinicService.getClinicsSchedule()
      .subscribe(item => {
        if (item.length > 0) {
          console.log('[ClinicSchedule] List loaded successful');
          this.hasList = true;
          this.clinicScheduleList = item;
          console.log('[ClinicSchedule] ClinicSchedule data: ', this.clinicScheduleList);
        } else {
          this.hasList = false;
        }
      },
        err => {
          console.error('[ClinicSchedule] Error: ', err.message);
          this.hasList = false;
        },
    );
  }


  goBack() {
    this.location.back();
  }

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
          console.log("Cancel");
        });
  }

  addClinicSchedule(){
    console.log("Approve");  
  }
}
