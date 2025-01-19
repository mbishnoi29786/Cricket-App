import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-deep-insights',
  templateUrl: './deep-insights.component.html',
  styleUrls: ['./deep-insights.component.css'],
})
export class DeepInsightsComponent implements OnChanges {
  ballsArray: any = [];
  matchId: any;
  matchData: any;
  oversArray: any = [];
  playersArray: any;
  team: any;
  totalRuns: any;
  battingTeam: any;
  bowlingTeam: any;
  public setFetch: any;

  constructor(
    private playerservice: PlayerServiceService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    const routeParams = this.route.snapshot.paramMap;
    this.matchId = routeParams.get('id');

    this.playerservice.getMatchAnalytics(this.matchId).subscribe((response: any) => {
      this.oversArray = response.analytics;
      console.log(this.oversArray);
      
    });

    this.playerservice.getOneMatch(this.matchId).subscribe((response: any) => {
      this.matchData = response.match;
      this.ballsArray = response.match.scoreCardTeam1;

      this.initializeMatchData(response.match);
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Detect changes when setFetch changes.
    if (changes['setFetch']) {
      this.updateDataBasedOnSetFetch();
    }
  }

  initializeMatchData(match: any) {
    if (match.firstBattingTeam === 1) {
      this.setFetch = 1;
      this.totalRuns = (match.firstTeamBattingComplete !== true) ? match.team1Runs : match.team2Runs;
      this.battingTeam = (match.firstTeamBattingComplete !== true) ? match.team1Players : match.team2Players;
      this.bowlingTeam = (match.firstTeamBattingComplete !== true) ? match.team2Players : match.team1Players;
    } else if (match.firstBattingTeam === 2) {
      this.setFetch = 2;
      this.totalRuns = (match.firstTeamBattingComplete !== true) ? match.team2Runs : match.team1Runs;
      this.battingTeam = (match.firstTeamBattingComplete !== true) ? match.team2Players : match.team1Players;
      this.bowlingTeam = (match.firstTeamBattingComplete !== true) ? match.team1Players : match.team2Players;
    }

    console.log(match.lastBallTeam2);
    
  }

  team1Data() {
    console.log('Switching to Team 1');
    this.setFetch = 1;
    this.bowlingTeam = this.matchData.team2Players;
    this.ballsArray = this.matchData.scoreCardTeam1;
    console.log('Bowling Team (Team 2):', this.matchData.team2Players);
    console.log('ScoreCard (Team 1):', this.matchData.scoreCardTeam1);
  }

  team2Data() {
    console.log('Switching to Team 2');
    this.setFetch = 2;
    this.bowlingTeam = this.matchData.team1Players;
    this.ballsArray = this.matchData.scoreCardTeam2;
    console.log('Bowling Team (Team 1):', this.matchData.team1Players);
    console.log('ScoreCard (Team 2):', this.matchData.scoreCardTeam2);
  }

  updateDataBasedOnSetFetch() {
    // This function will be called whenever `setFetch` changes
    if (this.setFetch === 1) {
      this.bowlingTeam = this.matchData.team2Players;
      this.ballsArray = this.matchData.scoreCardTeam1;
    } else if (this.setFetch === 2) {
      this.bowlingTeam = this.matchData.team1Players;
      this.ballsArray = this.matchData.scoreCardTeam2;
    }
  }

  findBowlerData(id: any) {
    return this.bowlingTeam?.filter((val: any) => val.playerId == id);
  }

  public arrayOfColours = [
    "#FF0000", "#FFA500", "#FFFF00", "#008000", "#00FFFF", "#0000FF", "#800080",
    "#FFC0CB", "#A52A2A", "#808080", "#F0E68C", "#FF6347", "#FFD700", "#00FF00",
    "#FF00FF", "#000000", "#FFFFFF", "#ADD8E6", "#8FBC8F", "#6B8E23"
  ];
}



