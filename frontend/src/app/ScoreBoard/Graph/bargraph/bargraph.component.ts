import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
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
  @Input() overs: Array<number> = [];
  @Input() team1Runs: Array<number> = [];
  @Input() team2Runs: Array<number> = [];
  chartHandler: Chart | undefined;
  count = 0;

  constructor(private graphservice: GraphService) {
    Chart.register(...registerables);
  }

  createChart() {
    const ctx = document.getElementById('MyChart') as HTMLCanvasElement;

    if (this.chartHandler) {
      this.chartHandler.destroy();  // Properly destroy the chart if it exists
    }

    if (ctx) {
      this.chartHandler = new Chart(ctx, {
        type: graph_type || 'bar',  // Default to 'bar' if undefined
        data: {
          labels: this.overs,
          datasets: [
            {
              label: 'Team 1 Runs',
              data: this.team1Runs,
              backgroundColor: '#ffb6c1',  // Team 1 color
              borderColor: '#ff6384',
              borderWidth: 1,
            },
            {
              label: 'Team 2 Runs',
              data: this.team2Runs,
              backgroundColor: '#ADD8E6',  // Team 2 color
              borderColor: '#36a2eb',
              borderWidth: 1,
            }
          ]
        },
        options: {
          responsive: true,
          aspectRatio: 1.5,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Runs'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Overs'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.dataset.label}: ${context.raw} runs`;
                }
              }
            }
          }
        }
      });
    }
  }

  ngOnChanges() {
    this.graphservice.graphChanged.subscribe(() => {
      this.createChart();
    });

    if (!this.count) {
      this.createChart();
      this.count++;
    }
  }
}
