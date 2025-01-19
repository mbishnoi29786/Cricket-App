import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchdetailsComponent } from './matchdetails.component';

describe('MatchdetailsComponent', () => {
  let component: MatchdetailsComponent;
  let fixture: ComponentFixture<MatchdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatchdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
