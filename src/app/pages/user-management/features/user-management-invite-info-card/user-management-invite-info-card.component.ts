import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invite } from '@core/interfaces/user';

@Component({
  selector: 'app-user-management-invite-info-card',
  templateUrl: './user-management-invite-info-card.component.html',
  styleUrls: ['./user-management-invite-info-card.component.scss']
})
export class UserManagementInviteInfoCardComponent {
  constructor(
    private dialogRef: MatDialogRef<UserManagementInviteInfoCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { invite: Invite | null },
  ) {}
}
