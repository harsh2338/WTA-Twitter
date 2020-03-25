import { TestBed } from '@angular/core/testing';

import { SentimentDataService } from './sentiment-data.service';

describe('SentimentDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SentimentDataService = TestBed.get(SentimentDataService);
    expect(service).toBeTruthy();
  });
});
