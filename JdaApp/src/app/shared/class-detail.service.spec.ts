import { TestBed } from '@angular/core/testing';

import { ClassDetailService } from './class-detail.service';

describe('ClassDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassDetailService = TestBed.get(ClassDetailService);
    expect(service).toBeTruthy();
  });
});
