import { Component, OnInit, Input } from '@angular/core';
import {} from '../sidemenu/sidemenu.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  setTitle: string;
  isHomeSelected: boolean;
  isPatientSelected: boolean;
  isLoginSelected: boolean;

  constructor(
    private router: Router) {
  }

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      if(this.router.url.startsWith('/home')){
        this.setTitle = "Home";   
      }else if(this.router.url.startsWith('/patient')){
        this.setTitle = "Patient";
      }
    });

  }

}
