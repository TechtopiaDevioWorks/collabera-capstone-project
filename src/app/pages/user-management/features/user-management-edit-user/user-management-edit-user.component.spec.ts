import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementEditUserComponent } from './user-management-edit-user.component';

describe('UserManagementEditUserComponent', () => {
  let component: UserManagementEditUserComponent;
  let fixture: ComponentFixture<UserManagementEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementEditUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
