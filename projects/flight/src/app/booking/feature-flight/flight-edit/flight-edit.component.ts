import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { routerFeature } from '../../../shared/logic-router-state';
import { initialFlight } from '../../logic-flight';


@Component({
  selector: 'app-flight-edit',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnChanges {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  @Input() flight = initialFlight;

  protected editForm = inject(FormBuilder).nonNullable.group({
    id: [0],
    from: [''],
    to: [''],
    date: [new Date().toISOString()],
    delayed: [false]
  });

  constructor() {
    this.store.select(routerFeature.selectRouteParams).subscribe(
      params => console.log(params)
    );

    this.editForm.patchValue({
      from: '5'
    });

    this.editForm.getRawValue();

    this.route.data.subscribe(console.log);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flight'].previousValue !== changes['flight'].currentValue) {
      this.editForm.patchValue(this.flight);
    }
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
