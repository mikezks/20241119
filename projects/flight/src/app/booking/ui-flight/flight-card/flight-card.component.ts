import { DatePipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, input, linkedSignal, model, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectCdBlink } from '../../../shared/util-cd-visualizer';
import { Flight } from '../../logic-flight';


@Component({
  selector: 'app-flight-card',
  imports: [
    NgStyle, DatePipe,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="card"
      [ngStyle]="{ 'background-color': selected() ? 'rgb(204, 197, 185)' : 'white' }"
    >
      <div class="card-header">
        <h2 class="card-title">{{ editableFlight().from }} - {{ editableFlight().to }}</h2>
      </div>

      <div class="card-body">
        <p>Flight-No.: {{ editableFlight().id }}</p>
        <p>Date: {{ editableFlight().date | date : "dd.MM.yyyy HH:mm" }}</p>
        <p>
          <button
            (click)="toggleSelection()"
            class="btn btn-info btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >{{ selected() ? "Remove" : "Select" }}</button>
          <a
            [routerLink]="['../edit', item().id]"
            class="btn btn-success btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >Edit</a>
          <button
            (click)="updateFrom('Miami')"
            class="btn btn-danger btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >Update</button>
          <button
            (click)="delay()"
            class="btn btn-danger btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >Delay</button>
        </p>
      </div>
    </div>

    <!-- {{ blink() }} -->
  `
})
export class FlightCardComponent implements OnInit, OnDestroy {
  blink = injectCdBlink();

  readonly item = input.required<Flight>();
  readonly editableFlight = linkedSignal(
    () => this.item()
  );
  readonly selected = model(false);
  readonly delayTrigger = output<Flight>();

  ngOnInit(): void {
    console.log('Flight Card INIT', this.item().id);
  }

  toggleSelection(): void {
    this.selected.update(value => !value);
  }

  updateFrom(from: string): void {
    this.editableFlight.update(value => ({
      ...value,
      from
    }));
  }

  delay(): void {
    console.log('Delay executed.')
    this.delayTrigger.emit(this.item());
  }

  ngOnDestroy(): void {
    console.log('Flight Card DESTROY', this.item().id);
  }
}
