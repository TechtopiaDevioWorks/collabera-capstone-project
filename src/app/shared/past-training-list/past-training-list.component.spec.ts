import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTrainingListComponent } from './past-training-list.component';

describe('PastTrainingListComponent', () => {
  let component: PastTrainingListComponent;
  let fixture: ComponentFixture<PastTrainingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastTrainingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastTrainingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
