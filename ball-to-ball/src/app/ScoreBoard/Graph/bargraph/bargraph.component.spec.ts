import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BargraphComponent } from './bargraph.component';

describe('BargraphComponent', () => {
  let component: BargraphComponent;
  let fixture: ComponentFixture<BargraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BargraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BargraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
