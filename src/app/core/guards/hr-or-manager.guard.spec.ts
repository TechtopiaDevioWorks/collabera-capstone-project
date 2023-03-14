import { TestBed } from '@angular/core/testing';

import { HrOrManagerGuard } from './hr-or-manager.guard';

describe('HrOrManagerGuard', () => {
  let guard: HrOrManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HrOrManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
