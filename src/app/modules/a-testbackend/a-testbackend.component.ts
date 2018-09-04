import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-a-testbackend',
  templateUrl: './a-testbackend.component.html',
  styleUrls: ['./a-testbackend.component.css']
})
export class ATestbackendComponent implements OnInit {
  weight: number;
  height: number;
  bmi: number;
  bmi_category: string;
  constructor() { 
    
  }

  ngOnInit() {
  }

  calculate(){
    this.bmi = this.weight / ( ( this.height / 3.28 ) * (this.height / 3.28));
    console.log(this.bmi);
    if(this.bmi < 18.5){
      this.bmi_category = 'Underweight';
    } else if ( this.bmi >= 18.5 && this.bmi <= 24.9 ){
      this.bmi_category = 'Normal';
    } else if ( this.bmi >= 25 && this.bmi <= 29.9 ){
      this.bmi_category = 'Overweight';
    } else if ( this.bmi >= 30 ){
      this.bmi_category = 'Obesity';
    } else {
      console.log('ERR: Out of scope');
    }
  }
}
