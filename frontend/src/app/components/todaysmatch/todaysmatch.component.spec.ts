import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysmatchComponent } from './todaysmatch.component';

describe('TodaysmatchComponent', () => {
  let component: TodaysmatchComponent;
  let fixture: ComponentFixture<TodaysmatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TodaysmatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysmatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
