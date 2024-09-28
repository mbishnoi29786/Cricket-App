import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualFieldComponent } from './visual-field.component';

describe('VisualFieldComponent', () => {
  let component: VisualFieldComponent;
  let fixture: ComponentFixture<VisualFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VisualFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
