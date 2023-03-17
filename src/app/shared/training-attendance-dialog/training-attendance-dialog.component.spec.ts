import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAttendanceDialogComponent } from './training-attendance-dialog.component';

describe('TrainingAttendanceDialogComponent', () => {
  let component: TrainingAttendanceDialogComponent;
  let fixture: ComponentFixture<TrainingAttendanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingAttendanceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingAttendanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
