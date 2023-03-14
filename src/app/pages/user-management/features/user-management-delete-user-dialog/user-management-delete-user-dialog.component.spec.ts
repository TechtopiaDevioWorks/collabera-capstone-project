import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementDeleteUserDialogComponent } from './user-management-delete-user-dialog.component';

describe('UserManagementDeleteUserDialogComponent', () => {
  let component: UserManagementDeleteUserDialogComponent;
  let fixture: ComponentFixture<UserManagementDeleteUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementDeleteUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementDeleteUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
