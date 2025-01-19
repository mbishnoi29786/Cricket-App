import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FloorValuePipe } from 'src/app/custom_pipe/floor-value.pipe';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live-scores',
  standalone: true,
  imports: [CommonModule, FloorValuePipe, RouterModule],
  templateUrl: './live-scores.component.html',
  styleUrls: ['./live-scores.component.css']
})
export class LiveScoresComponent implements OnInit, OnDestroy {
  matchData: any = [];
  scoreCardTeam1: any = [];
  playerOnstrike: any;
  BattingTeam = true;
  playerOnNonStrike: any;
  TotalRuns: any;
  bowlerId: any;
  private pollingInterval: any;
  private routeParamsSubscription: Subscription;
  hoverTeam: number | null = null; // Track which team is hovered

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private playersData: PlayerServiceService
  ) {}

  ngOnInit(): void {
    this.routeParamsSubscription = this.route.paramMap.subscribe((params) => {
      const matchIdFromRoute = params.get('id');
      this.startPolling(matchIdFromRoute);
    });
  }

  ngOnDestroy(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval); // Stop polling when the component is destroyed
    }
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe(); // Unsubscribe from route param changes
    }
  }

  // Start polling for the live match score data
  startPolling(matchId: string | null): void {
    if (matchId) {
      this.fetchMatchData(matchId); // First fetch the data
      this.pollingInterval = setInterval(() => {
        this.fetchMatchData(matchId);
      }, 5000); // Poll every 5 seconds
    }
  }

  // Fetch the live match data from the server
  fetchMatchData(matchId: string): void {
    this.playersData.getOneMatch(matchId, true).subscribe(
      (res: any) => {
        this.matchData = res.match;
        this.updateMatchDetails();
      },
      (err) => {
        console.error('Error fetching live match data', err);
      }
    );
  }

  // Update the match details based on the fetched data
  updateMatchDetails(): void {
    if (this.matchData?.firstBattingTeam === 1 && this.matchData?.firstTeamBattingComplete === false) {
      this.playerOnstrike = this.matchData?.team1Players.find(
        (player: any) => player.playerId === this.matchData?.lastBallTeam1?.playerOnStrikeId
      );
      this.playerOnNonStrike = this.matchData?.team1Players.find(
        (player: any) => player.playerId === this.matchData?.lastBallTeam1?.playerOnNonStrikeId
      );
      this.bowlerId = this.matchData?.team2Players.find(
        (player: any) => player.playerId === this.matchData?.lastBallTeam1?.bowlerId
      );
      this.TotalRuns = this.matchData?.team1Runs;
      this.BattingTeam = true;
    } else if (this.matchData?.firstBattingTeam === 2 && this.matchData?.firstTeamBattingComplete === false) {
      this.playerOnstrike = this.matchData?.team2Players.find(
        (player: any) => player.playerId === this.matchData?.lastBallTeam2?.playerOnStrikeId
      );
      this.playerOnNonStrike = this.matchData?.team2Players.find(
        (player: any) => player.playerId === this.matchData?.lastBallTeam2?.playerOnNonStrikeId
      );
      this.bowlerId = this.matchData?.team1Players.find(
        (player: any) => player.playerId === this.matchData?.lastBallTeam2?.bowlerId
      );
      this.TotalRuns = this.matchData?.team2Runs;
      this.BattingTeam = false;
    } else if (this.matchData?.firstBattingTeam === 2 && this.matchData?.firstTeamBattingComplete === true) {
      this.playerOnstrike = this.matchData?.team1Players.find(
        (player: any) => player.playerId === this.matchData?.lastBallTeam1?.playerOnStrikeId
      );
      this.playerOnNonStrike = this.matchData?.team1Players.find(
        (player: any) => player.playerId === this.matchData?.lastBallTeam1?.playerOnNonStrikeId
      );
      this.bowlerId = this.matchData?.team2Players.find(
        (player: any) => player.playerId === this.matchData?.lastBallTeam1?.bowlerId
      );
      this.TotalRuns = this.matchData?.team1Runs;
      this.BattingTeam = true;
    } else if (this.matchData?.firstBattingTeam === 1 && this.matchData?.firstTeamBattingComplete === true) {
      this.playerOnstrike = this.matchData?.team2Players.find(
        (player: any) => player.playerId === this.matchData?.lastBallTeam2?.playerOnStrikeId
      );
      this.playerOnNonStrike = this.matchData?.team2Players.find(
        (player: any) => player.playerId === this.matchData?.lastBallTeam2?.playerOnNonStrikeId
      );
      this.bowlerId = this.matchData?.team1Players.find(
        (player: any) => player.playerId === this.matchData?.lastBallTeam2?.bowlerId
      );
      this.TotalRuns = this.matchData?.team2Runs;
      this.BattingTeam = false;
    }
  }

  // Method to set the hovered team
  onTeamHover(teamId: number): void {
    this.hoverTeam = teamId;
  }

  // Method to reset hover effect when the mouse leaves the team card
  onTeamLeave(): void {
    this.hoverTeam = null;
  }
}
