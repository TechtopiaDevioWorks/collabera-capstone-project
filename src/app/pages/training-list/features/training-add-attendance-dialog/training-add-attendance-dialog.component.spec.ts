import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAddAttendanceDialogComponent } from './training-add-attendance-dialog.component';

describe('TrainingAddAttendanceDialogComponent', () => {
  let component: TrainingAddAttendanceDialogComponent;
  let fixture: ComponentFixture<TrainingAddAttendanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingAddAttendanceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingAddAttendanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
