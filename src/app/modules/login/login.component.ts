import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private router: Router
  constructor() { }

  ngOnInit() {
  }

  goHome(){
    // this.router.navigate(['/home']);
    console.log("click");
  }
}
