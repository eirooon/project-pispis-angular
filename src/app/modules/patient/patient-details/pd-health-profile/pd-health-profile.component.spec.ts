import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdHealthProfileComponent } from './pd-health-profile.component';

describe('PdHealthProfileComponent', () => {
  let component: PdHealthProfileComponent;
  let fixture: ComponentFixture<PdHealthProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PdHealthProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdHealthProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
