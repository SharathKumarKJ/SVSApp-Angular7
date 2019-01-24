import { TestBed } from '@angular/core/testing';

import { StudentAttendanceService } from './student-attendance.service';

describe('StudentAttendanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentAttendanceService = TestBed.get(StudentAttendanceService);
    expect(service).toBeTruthy();
  });
});
