import { TestBed } from '@angular/core/testing';

import { TestingService } from './testing.service';
import { HttpClient } from '@angular/common/http';

describe('TestingService', () => {
  let service: TestingService;

  const mockHttp = jasmine.createSpyObj('HttpClient', ['get']);
  mockHttp.get.and.returnValue({});

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: mockHttp }],
    });
    service = TestBed.inject(TestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
