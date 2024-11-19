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
import { provideNavigationService } from './shared/logic-navigation';
import { APP_NAVIGATION } from './app.navigation';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
      // withDebugTracing(),
      // withDisabledInitialNavigation()
    ),
    provideNavigationService(APP_NAVIGATION),
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
  ]
};
