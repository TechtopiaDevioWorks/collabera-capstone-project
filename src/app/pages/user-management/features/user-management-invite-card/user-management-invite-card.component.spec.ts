import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementInviteCardComponent } from './user-management-invite-card.component';

describe('UserManagementInviteCardComponent', () => {
  let component: UserManagementInviteCardComponent;
  let fixture: ComponentFixture<UserManagementInviteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementInviteCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementInviteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
