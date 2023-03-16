import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementTeamCardComponent } from './user-management-team-card.component';

describe('UserManagementTeamCardComponent', () => {
  let component: UserManagementTeamCardComponent;
  let fixture: ComponentFixture<UserManagementTeamCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementTeamCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementTeamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
