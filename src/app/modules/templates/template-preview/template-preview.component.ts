import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-template-preview',
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.css']
})
export class TemplatePreviewComponent implements OnInit {
  details: Object[];
  constructor(
    private router: Router
  ) { 
  }

  ngOnInit() {
    this.details = JSON.parse( localStorage.getItem( 'labdetails' ) );
    console.log(this.details);
    console.log(this.details['patientname']);
  }

  printPreview(){
    window.print();
    // mywindow.close();
    
  }
}
