import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MinUser } from '@core/interfaces/user';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-user-management-delete-user-dialog',
  templateUrl: './user-management-delete-user-dialog.component.html',
  styleUrls: ['./user-management-delete-user-dialog.component.scss'],
})
export class UserManagementDeleteUserDialogComponent {
  constructor(
    private _router: Router,
    private dialogRef: MatDialogRef<UserManagementDeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: MinUser | null },
    private _user: UserService
  ) {}
  requestLoading = false;
  requestError = '';

  async onConfirmClick() {
    if (this.requestLoading) {
      return;
    }
    this.requestLoading = true;
    this.requestError = '';

    if (this.data.user) {
      const deleteStatus = await this._user.delete(this.data.user.id);
      if (deleteStatus === true) {
        this.dialogRef.close();
      } else {
        this.requestError = `Delete Failed! ${deleteStatus}`;
      }
    }
    this.requestLoading = false;
  }
}
