import { Routes } from "@angular/router";
import { provideNavigationConfig } from "../shared/logic-navigation";
import { CHECKIN_NAVIGATION } from "./checkin.navigation";
import { PassengerEditComponent, PassengerSearchComponent } from "./feature-passenger";


export const CHECKIN_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideNavigationConfig(CHECKIN_NAVIGATION)
    ],
    children: [
      {
        path: '',
        redirectTo: 'passenger',
        pathMatch: 'full'
      },
      {
        path: 'passenger',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: PassengerSearchComponent,
          },
          {
            path: 'edit/:id',
            component: PassengerEditComponent
          }
        ]
      }
    ]
  }
];

export default CHECKIN_ROUTES;
