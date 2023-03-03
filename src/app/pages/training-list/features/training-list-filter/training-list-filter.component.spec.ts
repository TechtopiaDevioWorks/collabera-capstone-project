import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingListFilterComponent } from './training-list-filter.component';

describe('TrainingListFilterComponent', () => {
  let component: TrainingListFilterComponent;
  let fixture: ComponentFixture<TrainingListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingListFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
