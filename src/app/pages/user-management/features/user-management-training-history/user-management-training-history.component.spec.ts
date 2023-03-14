import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementTrainingHistoryComponent } from './user-management-training-history.component';

describe('UserManagementTrainingHistoryComponent', () => {
  let component: UserManagementTrainingHistoryComponent;
  let fixture: ComponentFixture<UserManagementTrainingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementTrainingHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementTrainingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
