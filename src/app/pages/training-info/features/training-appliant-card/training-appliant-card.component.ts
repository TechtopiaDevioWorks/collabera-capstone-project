import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Status, TrainingRegistrationMax } from '@core/interfaces/training';
import { User } from '@core/interfaces/user';
import { FeedbackService } from '@core/services/feedback.service';
import { TrainingService } from '@core/services/training.service';
import { FeedbackDialogComponent } from '@shared/feedback-dialog/feedback-dialog.component';
import { firstValueFrom } from 'rxjs';
import { TrainingRegistrationDeleteDialogComponent } from '../training-registration-delete-dialog/training-registration-delete-dialog.component';

@Component({
  selector: 'app-training-appliant-card',
  templateUrl: './training-appliant-card.component.html',
  styleUrls: ['./training-appliant-card.component.scss']
})
export class TrainingAppliantCardComponent implements OnInit {
    @Input() appliance: TrainingRegistrationMax | null = null;
    @Input() currentUser: User | null = null;
    @Input() statusList: Status[] = [];
    statusForm = new FormControl<null | number>(null);
    editMode = false;
    requestLoading = false;
    requestError = '';
    constructor(public dialog: MatDialog, private _training : TrainingService, private _feedback: FeedbackService) {}
  
    ngOnInit(): void {
      this.initForm();
    }
    
    initForm() {
      this.statusForm.reset();
      this.statusForm.disable();
      if(this.appliance){
        this.statusForm.setValue(this.appliance.status.id);
      }
    }
  
    onEditClick() {
      this.editMode = true;
      this.statusForm.enable();
    }

    onCancelEdit() {
      this.requestLoading = false;
      this.editMode = false;
      this.initForm();
    }

    async confirmEdit(): Promise<false|string> {
      const res = await firstValueFrom(this.dialog.open(FeedbackDialogComponent, {
        data: {
          title: 'Reason',
          subtitle: 'Enter a reason for the change',
          editable: true,
        }
      }).afterClosed());
      return res;
    }

    async saveEdit(registrationId: number, value: number) {
      if(!this.appliance) return;
      const res = await this._training.updateTrainingRegistrationStatus(registrationId, value);
      if(typeof res === 'string') {
        this.requestError = res;
      } else {
        const newStatus = this.statusList.find(e => e.id === value);
        this.appliance.status = newStatus ? newStatus : this.appliance.status;
        this.initForm();
      }
    }

    async saveFeedback(registrationId: number, message: string) {
      const res = await this._feedback.create(4, message, null, null, registrationId);
      if(typeof res === 'string') {
        this.requestError = res;
        return false;
      }
      return true;
    }

    async onSaveEdit() {
      this.requestError = '';
      const field = this.statusForm;
      if (!field || !this.appliance || !field.value) {
        this.onCancelEdit();
        return;
      }
      this.requestLoading = true;
      const reason = await this.confirmEdit();
      if(reason === false) {
        this.onCancelEdit();
        return;
      }
      await this.saveFeedback(this.appliance.id, reason);
      await this.saveEdit(this.appliance.id, field.value);
      this.requestLoading = false;
      this.onCancelEdit();
    }

    onDelete() {
      this.dialog.open(TrainingRegistrationDeleteDialogComponent, {
        data: {
          trainingRegistration: this.appliance
        }
      })
    }

    
  }
  
