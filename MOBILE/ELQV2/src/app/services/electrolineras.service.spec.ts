import { TestBed } from '@angular/core/testing';

import { ElectrolinerasService } from './electrolineras.service';

describe('ElectrolinerasService', () => {
  let service: ElectrolinerasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectrolinerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
