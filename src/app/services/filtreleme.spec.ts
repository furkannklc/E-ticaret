import { TestBed } from '@angular/core/testing';

import { Filtrelemeservices } from './filtrelemeservices';

describe('Filtrelemeservices', () => {
  let service: Filtrelemeservices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Filtrelemeservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
