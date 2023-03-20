import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MinUser } from '@core/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { UserManagementDeleteUserDialogComponent } from '../user-management-delete-user-dialog/user-management-delete-user-dialog.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-management-card',
  templateUrl: './user-management-card.component.html',
  styleUrls: ['./user-management-card.component.scss'],
})
export class UserManagementCardComponent implements OnInit {
  @Input() user: MinUser | null = null;
  @Input() manager: MinUser | null = null;
  @Output() refreshRequired: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  async onDeleteClick() {
    if(this.user?.id === this.manager?.id) return;
    const res = await firstValueFrom(
      this.dialog.open(UserManagementDeleteUserDialogComponent, {
        data: {
          user: this.user
        }
      })
        .afterClosed()
    );
    if (res===true) {
      this.refreshRequired.next(true);
    }
  }

}
