import { TestBed } from '@angular/core/testing';

import { TestingService } from './testing.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AppPageData } from '../app-page.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TestingService', () => {
  let service: TestingService;
  let httpMock: HttpTestingController;

  const mockHttp = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: HttpClient, useValue: mockHttp }],
    });
    service = TestBed.inject(TestingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener datos simulados', () => {
    mockHttp.get.and.returnValue(of({ title: 'Hola titulo', message: 'Hola message' }));
    service.obtenerDatos().subscribe(data => {
      expect(data.message).toBe('Hola message');
    });
  });

  it('debería obtener otros datos simulados', () => {
    mockHttp.get.and.returnValue(of({ title: 'Hola titulo', message: 'Hola message' }));
    service.obtenerOtrosDatos().subscribe(data => {
      expect(data.title).toBe('Hola titulo');
    });
  });
});
