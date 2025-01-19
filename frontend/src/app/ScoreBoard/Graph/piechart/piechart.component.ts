import { Component, OnChanges, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnChanges {
  @Input() overs: string[] = [];
  @Input() team1Runs: number[] = [];
  @Input() team2Runs: number[] = [];
  
  chartHandler!: Chart<"pie", number[], string>;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnChanges(): void {
    if (this.chartHandler) {
      this.chartHandler.destroy();
    }
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('PieChart') as HTMLCanvasElement;

    if (ctx) {
      this.chartHandler = new Chart<"pie", number[], string>(ctx, {
        type: 'pie',
        data: {
          labels: ['Team 1', 'Team 2'],  
          datasets: [
            {
              data: [
                this.team1Runs.reduce((acc, score) => acc + score, 0),  // Total Team 1 Runs
                this.team2Runs.reduce((acc, score) => acc + score, 0)   // Total Team 2 Runs
              ],
              backgroundColor: ['#ffb6c1', '#ADD8E6']
            }
          ]
        },
        options: {
          responsive: true,
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
    }
  }
}
