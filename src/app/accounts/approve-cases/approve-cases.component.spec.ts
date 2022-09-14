import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCasesComponent } from './approve-cases.component';

describe('ApproveCasesComponent', () => {
  let component: ApproveCasesComponent;
  let fixture: ComponentFixture<ApproveCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
