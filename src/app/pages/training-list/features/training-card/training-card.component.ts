import { Component, Input, OnInit } from '@angular/core';
import { MinTraining, Training } from '@core/interfaces/training';
import * as moment from 'moment';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.scss']
})
export class TrainingCardComponent implements OnInit{
  @Input() training: Training | MinTraining | null = null;
  imgUrl = 'https://bulma.io/images/placeholders/1280x960.png';
  expired = false;
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
