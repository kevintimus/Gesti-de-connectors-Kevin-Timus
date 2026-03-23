import { TestBed } from '@angular/core/testing';

import { ConectorBD } from './conector-bd';

describe('ConectorBD', () => {
  let service: ConectorBD;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConectorBD);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
