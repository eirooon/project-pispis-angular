import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VitalSignsService } from '../../../../shared/service/vital-signs.service';
import * as _ from 'lodash';

@Component({
  selector: 'pd-vital-signs',
  templateUrl: './pd-vital-signs.component.html',
  styleUrls: ['./pd-vital-signs.component.css']
})
export class PdVitalSignsComponent implements OnInit {
  @ViewChild('weightChart') weight: ElementRef;
  @ViewChild('heightChart') height: ElementRef;

  constructor(
    private _vitals: VitalSignsService
    ) {}

  ngOnInit() {
    this.initWeightChart();
    this.initHeightChart();
  }

  initWeightChart(){
    const weight = this.weight.nativeElement;

    const w_data = [{
      type: 'bar',
      x: ['2000-01-01', '2001-0-02', '2002-01-03', '2003-01-04', '2004-03-05', '2006-02-06', '2007-01-07', '2008-01-08', '2009-01-09', '2010-01-10'],
      y: [70, 75, 80, 78, 85, 87, 89, 90, 92, 88],
      marker: {
        color: '#172B4D'
    }
    }]

    const w_layout = {
      margin: { 
        t:15,
        l:30,
        b:30,
        r:30
      },
    }

    Plotly.plot(weight,w_data,w_layout,{
      responsive: true, 
      displayModeBar: false
    });
    
  }
  initHeightChart(){
    const height = this.height.nativeElement;

    const h_data = [{
      type: 'bar',
      x: ['2000-01-01', '2001-0-02', '2002-01-03', '2003-01-04', '2004-03-05', '2006-02-06', '2007-01-07', '2008-01-08', '2009-01-09', '2010-01-10'],
      y: [70, 75, 80, 78, 85, 87, 89, 90, 92, 88],
      marker: {
        color: '#172B4D'
    }
    }]

    const h_layout = {
      margin: { 
        t:15,
        l:15,
        b:15,
        r:15
      },
    }

    Plotly.plot(height,h_data,h_layout,{
      responsive: true, 
      displayModeBar: false
    });
  }

}
