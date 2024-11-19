import { Routes } from '@angular/router';
import { DepatureComponent } from './feature-departure';
import { BOARDING_NAVIGATION } from './boarding.navigation';
import { provideNavigationConfig } from '../shared/logic-navigation';

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
      }
    ]
  }
];

export default BOARDING_ROUTES;
