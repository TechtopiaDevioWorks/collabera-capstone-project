import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRegistrationDeleteDialogComponent } from './training-registration-delete-dialog.component';

describe('TrainingRegistrationDeleteDialogComponent', () => {
  let component: TrainingRegistrationDeleteDialogComponent;
  let fixture: ComponentFixture<TrainingRegistrationDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingRegistrationDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingRegistrationDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
