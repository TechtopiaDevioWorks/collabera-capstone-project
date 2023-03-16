import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Team } from '@core/interfaces/user';
import { UserService } from '@core/services/user.service';
import { SimpleConfirmationDialogComponent } from '@shared/simple-confirmation-dialog/simple-confirmation-dialog.component';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management-team-card',
  templateUrl: './user-management-team-card.component.html',
  styleUrls: ['./user-management-team-card.component.scss'],
})
export class UserManagementTeamCardComponent implements OnInit {
  @Input() team: Team | null = null;
  @Output() refreshRequired: EventEmitter<Boolean> = new EventEmitter();
  requestLoading = false;
  requestError = '';
  constructor(
    public dialog: MatDialog,
    private _user: UserService,
    private _toast: ToastrService
  ) {}

  ngOnInit(): void {}

  async onDeleteClick() {
    if (!this.team) return;
    const res = await firstValueFrom(
      this.dialog
        .open(SimpleConfirmationDialogComponent, {
          data: {
            title: 'Confirm Delete',
            message: `Are you sure you want to delete team: ${this.team.name} ?`,
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
    const teamid = this.team?.id;
    if (!teamid) return;
    this.requestLoading = true;
    this.requestError = '';
    const res = await this._user.deleteTeam(teamid);
    if (typeof res === 'string') {
      this.requestError = res;
      this._toast.error(`Team ${this.team?.name} delete failed! ${this.requestError}`);
    } else {
      this._toast.info(`Team ${this.team?.name} deleted succesfully!`);
      this.refreshRequired.next(true);
    }
    this.requestLoading = false;
  }
}
