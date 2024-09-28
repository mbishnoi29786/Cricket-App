import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTeam1BattingCompleteComponent } from './alert-team1-batting-complete.component';

describe('AlertTeam1BattingCompleteComponent', () => {
  let component: AlertTeam1BattingCompleteComponent;
  let fixture: ComponentFixture<AlertTeam1BattingCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AlertTeam1BattingCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertTeam1BattingCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
