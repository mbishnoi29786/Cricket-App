import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertEnterValidPlayerComponent } from './alert-enter-valid-player.component';

describe('AlertEnterValidPlayerComponent', () => {
  let component: AlertEnterValidPlayerComponent;
  let fixture: ComponentFixture<AlertEnterValidPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AlertEnterValidPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertEnterValidPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
