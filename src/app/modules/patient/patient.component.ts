import { Component, OnInit, HostListener} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  myTitle = "Patient"
  public shadow: boolean = false;

  constructor(
      private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
        console.log(this.router.url);
    });
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll($event) {
      let number = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      if (number > 10) {
          this.shadow = true;
      } else if (this.shadow && number < 10) {
          this.shadow = false;
      }
  }
  
}
