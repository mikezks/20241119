import { Routes } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { TicketEffects } from "./logic-flight/+state/effects";
import { ticketFeature } from "./logic-flight/+state/reducer";
import { FlightSearchComponent, FlightEditComponent, FlightBookingComponent } from "./feature-flight";
import { resolveFlight } from "./logic-flight/data-access/flight.resolver";
import { provideHttpClient, withInterceptors, withRequestsMadeViaParent } from "@angular/common/http";


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [
      provideState(ticketFeature),
      provideEffects([TicketEffects]),
      /* provideHttpClient(
        withInterceptors([myResponseTransfer]),
        withRequestsMadeViaParent()
      ), */
    ],
    children: [
      {
        path: '',
        redirectTo: 'flight',
        pathMatch: 'full'
      },
      {
        path: 'flight',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: FlightSearchComponent,
          },
          {
            path: 'edit/:id',
            component: FlightEditComponent,
            data: {
              name: 'Michael'
            },
            resolve: {
              flight: resolveFlight
            }
          }
        ]
      }
    ]
  }
];

export default BOOKING_ROUTES;
