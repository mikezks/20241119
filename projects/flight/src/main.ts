import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { routerFeature } from './app/shared/logic-router-state';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
          StoreModule.forRoot(),
          EffectsModule.forRoot(),
          StoreModule.forFeature(routerFeature)
        ),
        provideRouter(APP_ROUTES),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
