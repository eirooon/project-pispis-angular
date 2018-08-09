import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ATestbackendComponent } from './a-testbackend.component';

describe('ATestbackendComponent', () => {
  let component: ATestbackendComponent;
  let fixture: ComponentFixture<ATestbackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ATestbackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ATestbackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
