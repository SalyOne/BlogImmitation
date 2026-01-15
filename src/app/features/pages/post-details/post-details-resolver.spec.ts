import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { postDetailsResolver } from './post-details-resolver';

describe('postDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => postDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
