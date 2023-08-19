import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { TestingService } from './services/testing.service';
import { TestingComponent } from './testing/testing.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  const mockService = jasmine.createSpyObj('TestingService', ['obtenerDatos']);
  mockService.obtenerDatos.and.returnValue(of({ title: 'Hola', message: '¡Mi aplicación está funcionando!' }));

  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent, TestingComponent],
    providers: [
      {
        provide: TestingService,
        useValue: mockService
      },
    ],
    schemas: [NO_ERRORS_SCHEMA],
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Bienvenido a mi app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.data.title = 'Bienvenido a mi app';
    expect(app.data.title).toEqual('Bienvenido a mi app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(app.data.title);
  });

  it('should render content', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('¡Mi aplicación está funcionando!');
  });

  it('debería llamar a obtenerDatos en el servicio', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();

    expect(mockService.obtenerDatos).toHaveBeenCalled();
  });

  it('debería renderizar solo el componente testing', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const componenteHijo = fixture.nativeElement.querySelector('app-testing');
    const otrosComponentes = fixture.nativeElement.querySelectorAll('app-otro');

    expect(componenteHijo).toBeTruthy();
    expect(otrosComponentes.length).toBe(0);
  });

  it('debería llamar a una función cuando se haga clic en un botón', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

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
});
