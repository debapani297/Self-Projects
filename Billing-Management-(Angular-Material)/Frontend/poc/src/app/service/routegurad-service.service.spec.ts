import { TestBed } from '@angular/core/testing';

import { RouteguradServiceService } from './routegurad-service.service';

describe('RouteguradServiceService', () => {
  let service: RouteguradServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteguradServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
