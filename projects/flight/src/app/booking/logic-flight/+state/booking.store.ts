import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { FlightFilter } from '../model/flight-filter';
import { Flight } from '../model/flight';
import { computed, inject } from '@angular/core';
import { FlightService } from '../data-access/flight.service';
import { pipe, switchMap, tap } from 'rxjs';


export const BookingStore = signalStore(
  { providedIn: 'root' },
  withState({
    filter: {
      from: 'Hamburg',
      to: 'Graz',
      urgent: false
    } as FlightFilter,
    basket: {
      3: true,
      5: true,
    } as Record<number, boolean>,
    flights: [] as Flight[]
  }),
  withComputed(store => ({
    selectedFlights: computed(
      () => store.flights().filter(
        flight => store.basket()[flight.id]
      )
    ),
    delayedFlights: computed(
      () => store.flights().filter(flight => flight.delayed)
    )
  })),
  /**
   * Updater
   */
  withMethods(store => ({
    setFlights: (flights: Flight[]) =>
      patchState(store, { flights }),
  })),
  /**
   * Side-Effects
   */
  withMethods((
    store,
    flightService = inject(FlightService)
  ) => ({
    loadFlights: (filter: FlightFilter) => {
      console.log('Signal Store in use! :)')
      flightService.find(filter.from, filter.to, filter.urgent)
        .subscribe(flights => store.setFlights(flights));
    },
    rxLoadFlights: rxMethod<FlightFilter>(pipe(
      tap(() => console.log('Signal Store in reactively in use! :)')),
      switchMap(filter => flightService.find(filter.from, filter.to, filter.urgent)),
      tapResponse(
        flights => store.setFlights(flights),
        err => console.error(err)
      )
    ))
  })),
);
