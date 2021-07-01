import { TestBed } from '@angular/core/testing';

import { ElectrolineraService } from './electolinera.service';

describe('ElectrolineraService', () => {
  let service: ElectrolineraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectrolineraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

