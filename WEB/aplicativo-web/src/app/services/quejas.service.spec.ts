import { TestBed } from '@angular/core/testing';

import { QuejasService } from './quejas.service';

describe('QuejasService', () => {
  let service: QuejasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuejasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
