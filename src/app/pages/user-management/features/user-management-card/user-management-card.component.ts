import { Component, Input, OnInit } from '@angular/core';
import { MinUser } from '@core/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { UserManagementDeleteUserDialogComponent } from '../user-management-delete-user-dialog/user-management-delete-user-dialog.component';

@Component({
  selector: 'app-user-management-card',
  templateUrl: './user-management-card.component.html',
  styleUrls: ['./user-management-card.component.scss'],
})
export class UserManagementCardComponent implements OnInit {
  @Input() user: MinUser | null = null;
  @Input() manager: MinUser | null = null;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onDeleteClick() {
    if(this.user?.id === this.manager?.id) return;
    this.dialog.open(UserManagementDeleteUserDialogComponent, {
      data: {
        user: this.user
      }
    })
  }
  
  onTrainingHistoryClick() {
    if(this.user?.role.id !== 1) return;
  }
}
