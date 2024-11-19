import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';
import { provideRouterFeature } from './shared/logic-router-state';
import { authInterceptor } from './shared/logic-communication/http-interceptors/auth.interceptor';
import { delay, of, tap } from 'rxjs';
import { FlightService } from './booking/api-boarding';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
      // withDebugTracing(),
      // withDisabledInitialNavigation()
    ),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ]),
      // withInterceptorsFromDi(),
      // withFetch()
    ),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideStoreDevtools(),
    /* {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (
        flightService = inject(FlightService)
      ) => () => of(true).pipe(
        delay(5_000),
        tap(() => console.log(flightService.flights))
      )
    }, */
    provideAppInitializer((
      flightService = inject(FlightService)
    ) => of(true).pipe(
      delay(5_000),
      tap(() => console.log(flightService.flights))
    ))
  ]
};
