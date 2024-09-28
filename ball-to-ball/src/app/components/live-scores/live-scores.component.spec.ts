import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveScoresComponent } from './live-scores.component';

describe('LiveScoresComponent', () => {
  let component: LiveScoresComponent;
  let fixture: ComponentFixture<LiveScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LiveScoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
