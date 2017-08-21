import { TestBed, inject } from '@angular/core/testing';

import { FieldService } from './field.service';

describe('FieldService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldService]
    });
  });

  it('should be created', inject([FieldService], (service: FieldService) => {
    expect(service).toBeTruthy();
  }));
});
