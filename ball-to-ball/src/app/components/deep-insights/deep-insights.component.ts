import { Component } from '@angular/core';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { ActivatedRoute } from '@angular/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppModule } from 'src/app/app.module';
@Component({
  selector: 'app-deep-insights',
  templateUrl: './deep-insights.component.html',
  styleUrls: ['./deep-insights.component.css'],
})
export class DeepInsightsComponent {
  ballsArray:any;
  matchId: any;
  matchData:any;
  oversArray:any;
  playersArray:any;
  team: any;
  totalRuns: any;
  battingTeam: any;
  bowlingTeam: any;
  public setFetch:any;
constructor(private playerservice:PlayerServiceService,private route: ActivatedRoute){
  const routeParams = this.route.snapshot.paramMap;
    const matchIdFromRoute = routeParams.get('id');
    this.matchId=matchIdFromRoute;
    //
  this.playerservice.getMatchAnalytics(this.matchId).subscribe((response:any)=>{
    this.oversArray=response.analytics;
    //
  })
  this.playerservice.getOneMatch(this.matchId).subscribe((response:any)=>
  {this.ballsArray=response.match.scoreCardTeam1;
    this.matchData=response.match;
  //

    if (response.match.firstBattingTeam === 1) {
      this.setFetch=1;
      this.team = (response.match?.firstTeamBattingComplete !== true) ? response.match?.lastBallTeam1 : response.match.lastBallTeam2;
      this.totalRuns = (response.match?.firstTeamBattingComplete !== true) ? response.match?.team1Runs : response.match.team2Runs;
       this.battingTeam = (response.match?.firstTeamBattingComplete !== true) ? response.match?.team1Players : response.match.team2Players;
       this.bowlingTeam = (response.match?.firstTeamBattingComplete !== true) ? response.match?.team2Players : response.match.team1Players;
    } else if (response.match.firstBattingTeam === 2) {
      this.setFetch=2;
      this.team = (response.match.firstTeamBattingComplete !== true) ? response.match.lastBallTeam2 : response.match.lastBallTeam1;
      this.totalRuns = (response.match?.firstTeamBattingComplete !== true) ? response.match.team2Runs : response.match.team1Runs;
     this.battingTeam = (response.match?.firstTeamBattingComplete !== true) ? response.match.team2Players : response.match.team1Players;
      this.bowlingTeam = (response.match?.firstTeamBattingComplete !== true) ? response.match.team1Players : response.match.team2Players;
    }

  }

)}

team1Data(){
  this.setFetch=1;
  this.bowlingTeam=this.matchData.team2Players;
  this.ballsArray=this.matchData.scoreCardTeam1;
return
}

team2Data(){
  this.setFetch=2;
  this.bowlingTeam=this.matchData.team2Players;
  this.ballsArray=this.matchData.scoreCardTeam2;
  return
}
findBowlerData(id:any){
  return this.bowlingTeam?.filter((val:any)=>val.playerId==id)
}

public arrayOfColours=
              [
                "#FF0000", // Red
                "#FFA500", // Orange
                "#FFFF00", // Yellow
                "#008000", // Green
                "#00FFFF", // Cyan
                "#0000FF", // Blue
                "#800080", // Purple
                "#FFC0CB", // Pink
                "#A52A2A", // Brown
                "#808080", // Gray
                "#F0E68C", // Khaki
                "#FF6347", // Tomato
                "#FFD700", // Gold
                "#00FF00", // Lime
                "#FF00FF", // Fuchsia
                "#000000", // Black
                "#FFFFFF", // White
                "#ADD8E6", // Light blue
                "#8FBC8F", // Dark sea green
                "#6B8E23" // Olive drab
              ];

}
