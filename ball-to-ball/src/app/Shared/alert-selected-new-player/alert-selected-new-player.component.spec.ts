import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSelectedNewPlayerComponent } from './alert-selected-new-player.component';

describe('AlertSelectedNewPlayerComponent', () => {
  let component: AlertSelectedNewPlayerComponent;
  let fixture: ComponentFixture<AlertSelectedNewPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AlertSelectedNewPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertSelectedNewPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
