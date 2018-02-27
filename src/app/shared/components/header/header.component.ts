import { Component, OnInit, Input } from '@angular/core';
import {} from '../sidemenu/sidemenu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() setTitle;
  isHomeSelected: boolean;
  isPatientSelected: boolean;

  constructor() { }

  ngOnInit() {
    if(this.setTitle == "Home" ){
      this.isHomeSelected = true;
    }else if (this.setTitle == "Patient"){
      this.isPatientSelected = true;
    }
  }

}
