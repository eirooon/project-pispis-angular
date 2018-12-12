import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdVitalsSignsOxygenSaturationComponent } from './pd-vitals-signs-oxygen-saturation.component';

describe('PdVitalsSignsOxygenSaturationComponent', () => {
  let component: PdVitalsSignsOxygenSaturationComponent;
  let fixture: ComponentFixture<PdVitalsSignsOxygenSaturationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdVitalsSignsOxygenSaturationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdVitalsSignsOxygenSaturationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
