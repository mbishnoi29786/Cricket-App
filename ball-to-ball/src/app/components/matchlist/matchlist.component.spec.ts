import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchlistComponent } from './matchlist.component';

describe('MatchlistComponent', () => {
  let component: MatchlistComponent;
  let fixture: ComponentFixture<MatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatchlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
