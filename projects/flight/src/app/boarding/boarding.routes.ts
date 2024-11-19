import { Routes } from '@angular/router';
import { DepatureComponent } from './feature-departure';
import { BOARDING_NAVIGATION } from './boarding.navigation';
import { provideNavigationConfig } from '../shared/logic-navigation';
import { ScanTicketComponent } from './feature-departure/scan-ticket/scan-ticket.component';

export const BOARDING_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideNavigationConfig(BOARDING_NAVIGATION)
    ],
    children: [
      {
        path: '',
        redirectTo: 'departures',
        pathMatch: 'full'
      },
      {
        path: 'departures',
        component: DepatureComponent
      },
      {
        path: 'scan-ticket',
        component: ScanTicketComponent
      }
    ]
  }
];

export default BOARDING_ROUTES;
