import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOldCaseComponent } from './add-old-case.component';

describe('AddOldCaseComponent', () => {
  let component: AddOldCaseComponent;
  let fixture: ComponentFixture<AddOldCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOldCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOldCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
