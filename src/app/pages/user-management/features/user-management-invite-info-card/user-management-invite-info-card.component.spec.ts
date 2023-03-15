import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementInviteInfoCardComponent } from './user-management-invite-info-card.component';

describe('UserManagementInviteInfoCardComponent', () => {
  let component: UserManagementInviteInfoCardComponent;
  let fixture: ComponentFixture<UserManagementInviteInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementInviteInfoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementInviteInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
