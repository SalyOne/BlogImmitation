import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { formControlGuard } from './form-control-guard';

describe('formControlGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formControlGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
