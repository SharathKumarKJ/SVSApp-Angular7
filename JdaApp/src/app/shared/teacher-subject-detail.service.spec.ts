import { TestBed } from '@angular/core/testing';

import { TeacherSubjectDetailService } from './teacher-subject-detail.service';

describe('TeacherSubjectDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherSubjectDetailService = TestBed.get(TeacherSubjectDetailService);
    expect(service).toBeTruthy();
  });
});
