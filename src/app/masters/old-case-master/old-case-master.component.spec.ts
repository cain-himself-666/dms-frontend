import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldCaseMasterComponent } from './old-case-master.component';

describe('OldCaseMasterComponent', () => {
  let component: OldCaseMasterComponent;
  let fixture: ComponentFixture<OldCaseMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldCaseMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldCaseMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
