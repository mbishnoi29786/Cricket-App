import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepInsightsComponent } from './deep-insights.component';

describe('DeepInsightsComponent', () => {
  let component: DeepInsightsComponent;
  let fixture: ComponentFixture<DeepInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeepInsightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
