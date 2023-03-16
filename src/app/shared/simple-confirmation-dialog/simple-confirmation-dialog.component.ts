import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-confirmation-dialog',
  templateUrl: './simple-confirmation-dialog.component.html',
  styleUrls: ['./simple-confirmation-dialog.component.scss']
})
export class SimpleConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string },
  ) {}
}
