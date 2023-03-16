import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAppliantCardComponent } from './training-appliant-card.component';

describe('TrainingAppliantCardComponent', () => {
  let component: TrainingAppliantCardComponent;
  let fixture: ComponentFixture<TrainingAppliantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingAppliantCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingAppliantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
