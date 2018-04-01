import { Component, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  myTitle = "Home"
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

}
