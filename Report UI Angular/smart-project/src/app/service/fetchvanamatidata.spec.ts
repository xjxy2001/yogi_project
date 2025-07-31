import { TestBed } from '@angular/core/testing';

import { Fetchvanamatidata } from './fetchvanamatidata';

describe('Fetchvanamatidata', () => {
  let service: Fetchvanamatidata;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fetchvanamatidata);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
