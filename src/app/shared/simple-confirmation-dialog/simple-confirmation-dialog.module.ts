import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleConfirmationDialogComponent } from './simple-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    SimpleConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class SimpleConfirmationDialogModule { }
