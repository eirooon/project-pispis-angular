import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdVitalSignsAllComponent } from './pd-vital-signs-all.component';

describe('PdVitalSignsAllComponent', () => {
  let component: PdVitalSignsAllComponent;
  let fixture: ComponentFixture<PdVitalSignsAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdVitalSignsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdVitalSignsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
