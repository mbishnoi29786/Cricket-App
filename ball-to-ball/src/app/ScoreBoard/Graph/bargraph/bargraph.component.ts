/* eslint-disable no-mixed-spaces-and-tabs */
import {Component, Input, OnChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Chart,registerables } from 'chart.js'
import { GraphService } from 'src/app/services/graph.service';
import { graph_type } from 'src/app/Shared/add_score_button';

@Component({
  selector: 'app-bargraph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bargraph.component.html',
  styleUrls: ['./bargraph.component.css']
})

export class BargraphComponent implements OnChanges {

  count=0;
  @Input() overs:Array<number>=[];
  @Input() team1Runs:Array<number>=[];
  @Input() team2Runs:Array<number>=[];
  chartHandler:any;
  createChart(){

    this.chartHandler = new Chart("MyChart", {
      type: graph_type,

      data: {
        labels: this.overs,
	      datasets: [
          {
            label: "Team 1 Runs",
            data: this.team1Runs,
            backgroundColor: '#ffb6c1'
          },
          {
            label: "Team 2 Runs",
            data: this.team2Runs,
            backgroundColor: '#ADD8E6'
          }
        ]
      },
      options: {
        aspectRatio:1.9
      }

    });
  }

  constructor(private graphservice:GraphService){
    Chart.register(...registerables)
  }
  ngOnChanges(){

    this.graphservice.graphChanged.subscribe(()=>{
      this.chartHandler.destroy();
      this.createChart()
    })
    if(!this.count) {
      this.createChart()
      this.count++;
    }
  }

}
