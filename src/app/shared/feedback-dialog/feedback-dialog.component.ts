import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss'],
})
export class FeedbackDialogComponent {
  messageForm = new FormGroup({
    message:new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(500)])
  })
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      subtitle: string | null;
      message: string;
      editable: boolean;
    }
  ) {
    if(data.editable === false) {
      this.messageForm.get('message')?.disable();
    } 
    if(data.message) {
      this.messageForm.get('message')?.setValue(data.message);
    }
  }
}
