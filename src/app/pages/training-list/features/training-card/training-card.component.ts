import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MinTraining, Training } from '@core/interfaces/training';
import * as moment from 'moment';
import { TrainingApplyDialogComponent } from '../training-apply-dialog/training-apply-dialog.component';
import { TrainingDeleteDialogComponent } from '../training-delete-dialog/training-delete-dialog.component';

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
  constructor(private dialog: MatDialog) {

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

  onDeleteClick() {
    this.dialog.open(TrainingDeleteDialogComponent, {
      data: {
        training: this.training
      }
    })
  }

  onApplyClick() {
    this.dialog.open(TrainingApplyDialogComponent, {
      data: {
        training: this.training
      }
    })
  }

}
