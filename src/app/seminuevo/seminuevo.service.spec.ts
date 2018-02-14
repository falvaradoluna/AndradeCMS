import { TestBed, inject } from '@angular/core/testing';

import { SeminuevoService } from './seminuevo.service';

describe('SeminuevoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeminuevoService]
    });
  });

  it('should be created', inject([SeminuevoService], (service: SeminuevoService) => {
    expect(service).toBeTruthy();
  }));
});
