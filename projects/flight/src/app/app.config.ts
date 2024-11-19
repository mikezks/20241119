import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { APP_ROUTES } from "./app.routes";
import { routerFeature } from "./shared/logic-router-state";


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot(),
      EffectsModule.forRoot(),
      StoreModule.forFeature(routerFeature)
    ),
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
