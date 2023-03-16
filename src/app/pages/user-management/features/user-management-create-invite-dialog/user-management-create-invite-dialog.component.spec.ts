import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementCreateInviteDialogComponent } from './user-management-create-invite-dialog.component';

describe('UserManagementCreateInviteDialogComponent', () => {
  let component: UserManagementCreateInviteDialogComponent;
  let fixture: ComponentFixture<UserManagementCreateInviteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementCreateInviteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementCreateInviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
