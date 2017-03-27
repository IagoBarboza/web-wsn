import { TestBed, inject } from '@angular/core/testing';

import { SinkService } from './sink.service';

describe('NodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SinkService]
    });
  });

  it('should ...', inject([SinkService], (service: SinkService) => {
    expect(service).toBeTruthy();
  }));
});
