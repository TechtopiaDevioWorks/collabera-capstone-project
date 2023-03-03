import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MinTraining, Training } from '@core/interfaces/training';
import * as moment from 'moment';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.scss']
})
export class TrainingCardComponent implements OnInit{
  @Input() training: Training | MinTraining | null = null;
  @Input() userRoleId: number|null = null;
  imgUrl = 'https://bulma.io/images/placeholders/1280x960.png';
  expired = false;
  @Output() applyTraining: EventEmitter<number> = new EventEmitter()
  @Output() editTraining: EventEmitter<number> = new EventEmitter()
  @Output() deleteTraining: EventEmitter<number> = new EventEmitter()
  @Output() infoTraining: EventEmitter<number> = new EventEmitter()
  constructor() {

  }
  ngOnInit(): void {
    this.checkExpired()
  }

  checkExpired() {
    const currentMoment = moment.utc().add(-1, 'd')
    if(this.training?.endDate.isBefore(currentMoment)) {
      this.expired = true;
    }
  }

}
