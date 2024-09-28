import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertGameOverComponent } from './alert-game-over.component';

describe('AlertGameOverComponent', () => {
  let component: AlertGameOverComponent;
  let fixture: ComponentFixture<AlertGameOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AlertGameOverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertGameOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
