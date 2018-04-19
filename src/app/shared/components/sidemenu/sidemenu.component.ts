import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  setTitle = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/signin']);
    console.log("logout has been clicked!");
  }
}