import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdHealthProfileSelectionComponent } from './pd-health-profile-selection.component';

describe('PdHealthProfileSelectionComponent', () => {
  let component: PdHealthProfileSelectionComponent;
  let fixture: ComponentFixture<PdHealthProfileSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdHealthProfileSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdHealthProfileSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
