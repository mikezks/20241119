import { PassengerService } from './../../logic-passenger/data-access/passenger.service';

import { Component, effect, inject, input, numberAttribute, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { validatePassengerStatus } from '../../util-validation';
import { RouterLink } from '@angular/router';
import { initialPassenger } from '../../logic-passenger';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-passenger-edit',
  imports: [
    RouterLink,
    ReactiveFormsModule
],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  private readonly passengerService = inject(PassengerService);

  protected readonly id = input.required({ transform: numberAttribute });
  protected readonly passengerResource = this.passengerService.findByIdAsResource(this.id);

  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: [''],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [
      validatePassengerStatus(['A', 'B', 'C'])
    ]]
  });

  constructor() {
    effect(() => console.log(this.id()));
    effect(() => {
      const passenger = this.passengerResource.value();
      if (passenger) {
        this.editForm.patchValue(passenger);
      }
    });
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
