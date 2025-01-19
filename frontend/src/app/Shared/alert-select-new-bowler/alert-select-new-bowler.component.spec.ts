import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSelectNewBowlerComponent } from './alert-select-new-bowler.component';

describe('AlertSelectNewBowlerComponent', () => {
  let component: AlertSelectNewBowlerComponent;
  let fixture: ComponentFixture<AlertSelectNewBowlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AlertSelectNewBowlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertSelectNewBowlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
