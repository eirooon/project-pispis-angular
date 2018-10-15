import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdVitalSignsComponent } from './pd-vital-signs.component';

describe('PdVitalSignsComponent', () => {
  let component: PdVitalSignsComponent;
  let fixture: ComponentFixture<PdVitalSignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdVitalSignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdVitalSignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
