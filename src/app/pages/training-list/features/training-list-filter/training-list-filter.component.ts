import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainingFilter } from '@core/interfaces/training';
import { TrainingService } from '@core/services/training.service';
import { UserService } from '@core/services/user.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training-list-filter',
  templateUrl: './training-list-filter.component.html',
  styleUrls: ['./training-list-filter.component.scss']
})
export class TrainingListFilterComponent {
  @Input() userRoleId: number|null = null;
  filterForm = new FormGroup({
    interval: new FormGroup({
      minDate: new FormControl<moment.Moment|null>(null),
      maxDate: new FormControl<moment.Moment|null>(null),
    }),
		applicants: new FormControl<true|null>(null),
	});
	regionList: string[] = [];
	branchList: string[] = [];
  formSubscription: Subscription | null = null;
  filterData: TrainingFilter = {
    minDate: null,
    maxDate: null,
    applicants: null
  }
  @Output() filterOut: EventEmitter<TrainingFilter> = new EventEmitter();
	constructor(private _training: TrainingService, private _user: UserService) {}

	ngOnInit(): void {
    this.formSubscription = this.filterForm.valueChanges.subscribe((newValues) => {
      this.filterData.minDate = newValues.interval?.minDate;
      this.filterData.maxDate = newValues.interval?.maxDate;
      this.filterData.applicants = newValues?.applicants;
      this.filterOut.next(this.filterData);
    })
	}


  ngOnDestroy(): void {
    if(this.formSubscription) {
      this.formSubscription.unsubscribe();
      this.formSubscription = null;
    }
  }

}
