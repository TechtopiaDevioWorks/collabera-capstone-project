import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingHistoryCardComponent } from './training-history-card.component';

describe('TrainingHistoryCardComponent', () => {
  let component: TrainingHistoryCardComponent;
  let fixture: ComponentFixture<TrainingHistoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingHistoryCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
