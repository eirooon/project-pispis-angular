import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdVitalSignsWeightComponent } from './pd-vital-signs-weight.component';

describe('PdVitalSignsWeightComponent', () => {
  let component: PdVitalSignsWeightComponent;
  let fixture: ComponentFixture<PdVitalSignsWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdVitalSignsWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdVitalSignsWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
