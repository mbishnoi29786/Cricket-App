import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchformComponent } from './matchform.component';

describe('MatchformComponent', () => {
  let component: MatchformComponent;
  let fixture: ComponentFixture<MatchformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatchformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
