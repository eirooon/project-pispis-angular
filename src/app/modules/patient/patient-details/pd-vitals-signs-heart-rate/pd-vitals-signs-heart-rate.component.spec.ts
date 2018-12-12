import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdVitalsSignsHeartRateComponent } from './pd-vitals-signs-heart-rate.component';

describe('PdVitalsSignsHeartRateComponent', () => {
  let component: PdVitalsSignsHeartRateComponent;
  let fixture: ComponentFixture<PdVitalsSignsHeartRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdVitalsSignsHeartRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdVitalsSignsHeartRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
