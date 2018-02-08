import { TestBed, inject } from '@angular/core/testing';

import { CatunidadService } from './catunidad.service';

describe('CatunidadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatunidadService]
    });
  });

  it('should be created', inject([CatunidadService], (service: CatunidadService) => {
    expect(service).toBeTruthy();
  }));
});
