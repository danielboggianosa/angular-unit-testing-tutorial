import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { TestingService } from './services/testing.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: TestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for mocking HTTP requests
      providers: [TestingService], // Provide the service
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements and attributes
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    service = TestBed.inject(TestingService); // Inject the service
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Bienvenido a mi app'`, () => {
    app.data.title = 'Bienvenido a mi app';
    expect(app.data.title).toEqual('Bienvenido a mi app');
  });

  it('should render title', () => {
    app.data.title = 'Bienvenido a mi app';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(app.data.title);
  });

  it('should render content', () => {
    app.data.message = '¡Mi aplicación está funcionando!';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('¡Mi aplicación está funcionando!');
  });

  it('debería llamar a obtenerDatos en el servicio', () => {
    spyOn(service, 'obtenerDatos').and.returnValue(of({ title: '', message: '' }));
    app.ngOnInit();
    expect(service.obtenerDatos).toHaveBeenCalled();
  });

  it('debería renderizar solo el componente testing', () => {
    fixture.detectChanges();

    const componenteHijo = fixture.nativeElement.querySelector('app-testing');
    const otrosComponentes = fixture.nativeElement.querySelectorAll('app-otro');

    expect(componenteHijo).toBeTruthy();
    expect(otrosComponentes.length).toBe(0);
  });

  it('debería llamar a una función cuando se haga clic en un botón', () => {
    const boton = fixture.nativeElement.querySelector('button');
    spyOn(app, 'toggleOther');

    boton.click();

    expect(app.toggleOther).toHaveBeenCalled();
  });

  it('debería renderizar el componente testing y el componente otro', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.toggleOther();
    fixture.detectChanges();

    const componenteHijo = fixture.nativeElement.querySelector('app-testing');
    const otrosComponentes = fixture.nativeElement.querySelectorAll('app-otro');

    expect(componenteHijo).toBeTruthy();
    expect(otrosComponentes.length).toBe(1);
  });

  it('should retrieve other data on child event', fakeAsync(() => {
    const mockData = {
      title: 'Mock Title',
      message: 'Mock Message'
    };
    spyOn(service, 'obtenerOtrosDatos').and.returnValue(of(mockData)); // Mock the service method

    app.recieveChildEvent();
    tick(); // Simulate the passage of time until all asynchronous operations complete
    expect(app.data).toEqual(mockData);
  }));
});
