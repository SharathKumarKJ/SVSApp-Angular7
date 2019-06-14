import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMarksDialogComponent } from './student-marks-dialog.component';

describe('StudentMarksDialogComponent', () => {
  let component: StudentMarksDialogComponent;
  let fixture: ComponentFixture<StudentMarksDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMarksDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMarksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
