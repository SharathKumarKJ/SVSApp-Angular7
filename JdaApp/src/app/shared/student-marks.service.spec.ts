import { TestBed } from '@angular/core/testing';

import { StudentMarksService } from './student-marks.service';

describe('StudentMarksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentMarksService = TestBed.get(StudentMarksService);
    expect(service).toBeTruthy();
  });
});
