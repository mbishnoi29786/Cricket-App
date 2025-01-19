import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { MatchlistComponent } from "../matchlist/matchlist.component";
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-matchdetails',
  standalone: true,
  templateUrl: './matchdetails.component.html',
  styleUrls: ['./matchdetails.component.css'],
  imports: [CommonModule, RouterModule, MatchlistComponent, TableComponent]
})
export class MatchdetailsComponent implements OnInit {

  matchDetail: any = [];
  Id: string | null = '';
  overs: any;
  matchdate = new Date();
  todayMatch: Array<any> = [];
  status: number | undefined; // 1 = Ongoing, 2 = Scheduled, 0 = Completed or Not Started

  constructor(private playerservice: PlayerServiceService, private activatedroute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.Id = this.activatedroute.snapshot.paramMap.get('id');
    this.playerservice.getOneMatch(this.Id).subscribe((res: any) => {
      this.matchDetail.push(res.match);
      const todayMatchdate = this.playerservice.formatDate(this.matchDetail[0].date);

      // Checking if the match is completed
      if (this.matchDetail[0].matchComplete) {
        this.status = 0; // Completed
      }
      // If match is not completed and scheduled date is in the future
      else if (todayMatchdate > this.playerservice.formatDate(this.matchdate)) {
        this.status = 2; // Scheduled for later
      }
      // If match is not completed and the date is today or in the past
      else {
        this.status = 1; // Ongoing
      }
    }, (err) => {
      if (localStorage.getItem('token')) {
        console.log(err);
        this.router.navigate(['matches']);
      }
    });
  }

  toLiveScore() {
    this.router.navigate(['livescores', this.Id]);
  }

  routeToGiven(route: string) {
    this.router.navigate([route, this.Id]);
  }

  // Helper method to get the winner's name in titlecase
  getWinner(match: any): string {
    const team1Runs = match.team1Runs;
    const team2Runs = match.team2Runs;
    const firstBattingTeam = match.firstBattingTeam;

    if (firstBattingTeam === 1) {
      // Team 1 batted first
      return team1Runs > team2Runs ? match.team1Name : match.team2Name;
    } else {
      // Team 2 batted first
      return team2Runs > team1Runs ? match.team2Name : match.team1Name;
    }
  }
}
