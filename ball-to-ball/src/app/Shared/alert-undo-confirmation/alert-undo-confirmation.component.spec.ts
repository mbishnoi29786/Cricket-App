import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertUndoConfirmationComponent } from './alert-undo-confirmation.component';

describe('AlertUndoConfirmationComponent', () => {
  let component: AlertUndoConfirmationComponent;
  let fixture: ComponentFixture<AlertUndoConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AlertUndoConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertUndoConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
