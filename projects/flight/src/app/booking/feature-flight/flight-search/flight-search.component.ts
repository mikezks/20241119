import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Injector, runInInjectionContext, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight, FlightFilter, injectTicketsFacade } from '../../logic-flight';
import { FlightCardComponent, FlightFilterComponent } from '../../ui-flight';
import { FlightService } from '../../api-boarding';


@Component({
  selector: 'app-flight-search',
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent
  ],
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private ticketsFacade = injectTicketsFacade();

  protected filter = signal({
    from: 'London',
    to: 'New York',
    urgent: false
  });
  protected route = computed(
    () => 'From ' + this.filter().from + ' to ' + this.filter().to + '.'
  );
  protected basket: Record<number, boolean> = {
    3: true,
    5: true
  };
  protected flightResult = this.ticketsFacade.flights;

  constructor() {
    effect(() => console.log(this.route()));

    console.log(this.filter().from);
    this.filter.update(value => ({ ...value, from: 'Warschau' }));
    console.log(this.filter().from);
    this.filter.update(value => ({ ...value, from: 'Barcelona' }));
    console.log(this.filter().from);
    this.filter.update(value => ({ ...value, from: 'Johannesburg' }));
    console.log(this.filter().from);
    this.filter.update(value => ({ ...value, from: 'Rom' }));
    console.log(this.filter().from);
    this.filter.update(value => ({ ...value, from: 'Athen' }));
    console.log(this.filter().from);
  }

  protected search(filter: FlightFilter): void {
    this.filter.set(filter);

    if (!this.filter().from || !this.filter().to) {
      return;
    }

    this.ticketsFacade.search(this.filter());
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    this.ticketsFacade.update(newFlight);
  }

  protected reset(): void {
    this.ticketsFacade.reset();
  }
}
