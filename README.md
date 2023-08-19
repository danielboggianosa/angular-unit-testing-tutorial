# Tutorial de test unitario en Angular

## 1. **Herramientas y Conceptos Básicos:**

- **Jasmine:** Es un framework de pruebas utilizado en Angular para escribir y ejecutar pruebas unitarias.

- **Karma:** Es un test runner que se utiliza para ejecutar las pruebas en diferentes navegadores y ambientes. Angular CLI utiliza Karma por defecto.

## 2. **Preparación del Entorno:**

- Angular CLI (Command Line Interface) proporciona comandos útiles para crear componentes, servicios, directivas y otros elementos. Puedes usar `ng generate component`, `ng generate service`, etc., para generar automáticamente los archivos necesarios, incluidos los archivos de prueba.

## 3. **Escribir Pruebas:**

- Para escribir pruebas, se crean archivos de prueba junto a los archivos del componente o servicio que estás probando. Por ejemplo, si tienes `mi-componente.ts`, puedes crear `mi-componente.spec.ts` para escribir las pruebas.

- Las pruebas Jasmine están organizadas en suites (conjuntos) y casos de prueba (specs). Una suite se crea usando `describe` y los casos de prueba se crean usando `it`.

## 4. **Configuración Básica de Prueba:**

Un ejemplo básico de una prueba unitaria para un componente en Angular podría verse así:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiComponente } from './mi-componente.component';

describe('MiComponente', () => {
  let component: MiComponente;
  let fixture: ComponentFixture<MiComponente>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MiComponente ],
    });
    fixture = TestBed.createComponent(MiComponente);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
```

## 5. **Simulación y Aislamiento:**

- En las pruebas unitarias, es importante aislar las dependencias externas. Puedes usar "mocks" y "spies" para simular el comportamiento de servicios y otras dependencias.

- `spyOn` es una función que se utiliza para "espiar" métodos de objetos y verificar si han sido llamados.

## 6. **Detección de Cambios:**

- En Angular, la detección de cambios es un proceso clave. En las pruebas unitarias, puedes usar `fixture.detectChanges()` para activar la detección de cambios después de realizar modificaciones en el componente.

## 7. **Pruebas de Servicios:**

- Los servicios en Angular son componentes sin interfaz de usuario. Puedes probarlos de manera similar a los componentes, creando una instancia del servicio y probando sus métodos.

## 8. **Pruebas de Directivas:**

- Las directivas en Angular también se pueden probar. Puedes crear un componente de prueba que utilice la directiva y luego inspeccionar el resultado.

## 9. **Pruebas de Rutas:**

- Las pruebas de rutas verifican que las rutas enrutadoras funcionen correctamente. Puedes usar el módulo `RouterTestingModule` proporcionado por Angular para simular las rutas en las pruebas.

## 10. **Pruebas Asíncronas:**

- En Angular, muchas operaciones son asíncronas, como las llamadas HTTP. Puedes usar la función `async` y `fakeAsync` junto con `tick` para manejar pruebas asíncronas de manera efectiva.

## 11. **Code Coverage (Cobertura de Código):**

- El código coverage te muestra qué partes de tu código están siendo ejecutadas por las pruebas. Herramientas como Istanbul pueden generar informes de cobertura de código para ayudarte a identificar áreas no probadas.

Recuerda que las pruebas unitarias son una parte fundamental del desarrollo de software de alta calidad en Angular. Proporcionan confianza en que las partes individuales de tu aplicación funcionan como se espera y permiten una detección temprana de problemas.
