import { TestBed, inject } from '@angular/core/testing';

import { TipounidadService } from './tipounidad.service';

describe('TipounidadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipounidadService]
    });
  });

  it('should be created', inject([TipounidadService], (service: TipounidadService) => {
    expect(service).toBeTruthy();
  }));
});
