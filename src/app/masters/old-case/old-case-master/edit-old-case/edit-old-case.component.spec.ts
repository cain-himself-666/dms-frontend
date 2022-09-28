import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOldCaseComponent } from './edit-old-case.component';

describe('EditOldCaseComponent', () => {
  let component: EditOldCaseComponent;
  let fixture: ComponentFixture<EditOldCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOldCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOldCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
