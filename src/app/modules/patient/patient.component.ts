import { Component, OnInit, HostListener} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  public sticky: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll($event) {
      let number = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      if (number > 40) {
          this.sticky = true;
      } else if (this.sticky && number < 10) {
          this.sticky = false;
      }
  }
  
}
