import { Component, Input } from '@angular/core';
import { TrainingRegistrationMax } from '@core/interfaces/training';
import { User } from '@core/interfaces/user';

@Component({
  selector: 'app-training-history-card',
  templateUrl: './training-history-card.component.html',
  styleUrls: ['./training-history-card.component.scss']
})
export class TrainingHistoryCardComponent {
  @Input() training: TrainingRegistrationMax | null = null;
  @Input() currentUser: User|null = null;
}
