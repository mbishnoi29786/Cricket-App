import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddscoreComponent } from './addscore.component';

describe('AddscoreComponent', () => {
  let component: AddscoreComponent;
  let fixture: ComponentFixture<AddscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddscoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
