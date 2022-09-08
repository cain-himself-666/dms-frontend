import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexMasterComponent } from './complex-master.component';

describe('ComplexMasterComponent', () => {
  let component: ComplexMasterComponent;
  let fixture: ComponentFixture<ComplexMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplexMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
