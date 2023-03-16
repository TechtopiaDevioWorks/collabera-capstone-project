import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementCreateTeamComponent } from './user-management-create-team.component';

describe('UserManagementCreateTeamComponent', () => {
  let component: UserManagementCreateTeamComponent;
  let fixture: ComponentFixture<UserManagementCreateTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementCreateTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementCreateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
