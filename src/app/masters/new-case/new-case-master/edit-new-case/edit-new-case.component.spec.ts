import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewCaseComponent } from './edit-new-case.component';

describe('EditNewCaseComponent', () => {
  let component: EditNewCaseComponent;
  let fixture: ComponentFixture<EditNewCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
