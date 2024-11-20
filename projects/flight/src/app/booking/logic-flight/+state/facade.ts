import { inject, signal } from "@angular/core"
import { Store } from "@ngrx/store"
import { ticketActions } from "./actions";
import { ticketFeature } from "./reducer";
import { FlightFilter } from "../model/flight-filter";
import { Flight } from "../model/flight";
import { BookingStore } from "./booking.store";
import { of } from "rxjs";


export function injectTicketsFacade() {
  const store = inject(BookingStore);

  return {
    flights: store.flights,
    search: (filter: FlightFilter) =>
      store.rxLoadFlights(filter),
    setFlights: (flights: Flight[]) =>
      store.setFlights(flights),
    update: (flight: Flight) => {},
    reset: () =>
      store.setFlights([]),
  };
}
