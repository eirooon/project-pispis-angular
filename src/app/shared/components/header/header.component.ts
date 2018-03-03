import { Component, OnInit, Input } from '@angular/core';
import {} from '../sidemenu/sidemenu.component';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  setTitle: string;
  isHomeSelected: boolean;
  isPatientSelected: boolean;
  
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.route.routeConfig != null){
      if (this.route.routeConfig.path == "home"){
        this.isHomeSelected = true;
        this.setTitle = "Home";
      }else if( this.route.routeConfig.path == "patient"){
        this.isPatientSelected = true;
        this.setTitle = "Patient";
      }
    }
    
  }

}
