import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Invite} from '@core/interfaces/user';
import { UserService } from '@core/services/user.service';
import { SimpleConfirmationDialogComponent } from '@shared/simple-confirmation-dialog/simple-confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-management-invite-card',
  templateUrl: './user-management-invite-card.component.html',
  styleUrls: ['./user-management-invite-card.component.scss']
})
export class UserManagementInviteCardComponent implements OnInit, OnDestroy {
  @Input() invite: Invite | null = null;
  @Output() refreshRequired: EventEmitter<Boolean> = new EventEmitter();
  requestLoading = false;
  requestError = '';

  constructor(
    public dialog: MatDialog,
    private _user: UserService,
    private _toast: ToastrService
  ) {}


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  async onDeleteClick() {
    if (!this.invite) return;
    const res = await firstValueFrom(
      this.dialog
        .open(SimpleConfirmationDialogComponent, {
          data: {
            title: 'Confirm Delete',
            message: `Are you sure you want to delete invite to: ${this.invite.email} ?`,
          },
        })
        .afterClosed()
    );
    if (res === true) this.deleteConfirmed();
  }

  async deleteConfirmed() {
    if (this.requestLoading) {
      return;
    }
    const inviteId = this.invite?.id;
    if (!inviteId) return;
    this.requestLoading = true;
    this.requestError = '';
    const res = await this._user.deleteInvite(inviteId);
    if (typeof res === 'string') {
      this.requestError = res;
      this._toast.error(`Invite to ${this.invite?.email} delete failed! ${this.requestError}`);
    } else {
      this._toast.info(`Invite to ${this.invite?.email} deleted succesfully!`);
      this.refreshRequired.next(true);
    }
    this.requestLoading = false;
  }

}
