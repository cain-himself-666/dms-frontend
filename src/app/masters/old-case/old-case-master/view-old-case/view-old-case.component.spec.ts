import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOldCaseComponent } from './view-old-case.component';

describe('ViewOldCaseComponent', () => {
  let component: ViewOldCaseComponent;
  let fixture: ComponentFixture<ViewOldCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOldCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOldCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
