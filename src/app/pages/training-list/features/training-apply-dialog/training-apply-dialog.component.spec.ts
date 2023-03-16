import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingApplyDialogComponent } from './training-apply-dialog.component';

describe('TrainingApplyDialogComponent', () => {
  let component: TrainingApplyDialogComponent;
  let fixture: ComponentFixture<TrainingApplyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingApplyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingApplyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
