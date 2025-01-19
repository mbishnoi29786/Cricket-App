import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BargraphComponent } from './bargraph.component';
import { GraphService } from 'src/app/services/graph.service';
import { EventEmitter } from '@angular/core';

describe('BargraphComponent', () => {
  let component: BargraphComponent;
  let fixture: ComponentFixture<BargraphComponent>;
  let graphServiceStub: Partial<GraphService>;

  beforeEach(async () => {
    graphServiceStub = {
      graphChanged: new EventEmitter<boolean>()  // Properly mock EventEmitter
    };

    await TestBed.configureTestingModule({
      imports: [BargraphComponent],
      providers: [{ provide: GraphService, useValue: graphServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(BargraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should react to graphChanged event', () => {
    const spy = spyOn(component, 'createChart');
    (graphServiceStub.graphChanged as EventEmitter<boolean>).emit(true);  // Emit event to trigger ngOnChanges
    expect(spy).toHaveBeenCalled();
  });
});
