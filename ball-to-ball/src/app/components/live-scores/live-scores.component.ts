import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FloorValuePipe } from 'src/app/custom_pipe/floor-value.pipe';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PlayerServiceService } from 'src/app/services/player-service.service';
@Component({
  selector: 'app-live-scores',
  standalone: true,
  imports: [CommonModule,FloorValuePipe,RouterModule],
  templateUrl: './live-scores.component.html',
  styleUrls: ['./live-scores.component.css']
})
export class LiveScoresComponent  {
 matchData:any=[];
 scoreCardTeam1:any=[];
 playerOnstrike:any;
 BattingTeam=true;
 playerOnNonStrike:any;
 TotalRuns:any;
 bowlerId:any;
  constructor(private http:HttpClient,private route: ActivatedRoute ,private playersData:PlayerServiceService) {
    const routeParams = this.route.snapshot.paramMap;
    const matchIdFromRoute = routeParams.get('id');
     this.playersData.getOneMatch(matchIdFromRoute,true).subscribe((res:any)=>{
      this.matchData=res.match;

      if(this.matchData?.firstBattingTeam===1 && this.matchData?.firstTeamBattingComplete===false){
      this.playerOnstrike=this.matchData?.team1Players.find((player:any)=>player.playerId === this.matchData?.lastBallTeam1?.playerOnStrikeId)
      this.playerOnNonStrike=this.matchData?.team1Players.find((player:any)=>player.playerId === this.matchData?.lastBallTeam1?.playerOnNonStrikeId)
      this.bowlerId=this.matchData?.team2Players.find((player:any)=>player.playerId === this.matchData?.lastBallTeam1?.bowlerId)
      this.TotalRuns=this.matchData?.team1Runs;
      this.BattingTeam=true
    }
      else if(this.matchData?.firstBattingTeam===2 && this.matchData?.firstTeamBattingComplete===false){
        this.playerOnstrike=this.matchData?.team2Players.find((player:any)=>player.playerId === this.matchData?.lastBallTeam2?.playerOnStrikeId)
        this.playerOnNonStrike=this.matchData?.team2Players.find((player:any)=>player.playerId === this.matchData?.lastBallTeam2?.playerOnNonStrikeId)
        this.bowlerId=this.matchData?.team1Players.find((player:any)=>player.playerId === this.matchData?.lastBallTeam2?.bowlerId)
        this.TotalRuns=this.matchData?.team2Runs;
        this.BattingTeam=false
      }
      else if (this.matchData?.firstBattingTeam===2 && this.matchData?.firstTeamBattingComplete===true){
        this.playerOnstrike=this.matchData?.team1Players.find((player:any)=>player.playerId === this.matchData?.lastBallTeam1?.playerOnStrikeId)
        this.playerOnNonStrike=this.matchData?.team1Players.find((player:any)=>player.playerId === this.matchData?.lastBallTeam1?.playerOnNonStrikeId)
        this.bowlerId=this.matchData?.team2Players.find((player:any)=>player.playerId === this.matchData?.lastBallTeam1?.bowlerId)
        this.TotalRuns=this.matchData?.team1Runs;
        this.BattingTeam=true
      }
      else if (this.matchData?.firstBattingTeam===1 && this.matchData?.firstTeamBattingComplete===true){
        this.playerOnstrike=this.matchData?.team2Players.find((player:any)=>player.playerId === this.matchData?.lastBallTeam2?.playerOnStrikeId)
        this.playerOnNonStrike=this.matchData?.team2Players.find((player:any)=>player.playerId === this.matchData?.lastBallTeam2?.playerOnNonStrikeId)
        this.bowlerId=this.matchData?.team1Players.find((player:any)=>player.playerId === this.matchData?.lastBallTeam2?.bowlerId)
        this.TotalRuns=this.matchData?.team2Runs;
        this.BattingTeam=false
      }
    })
  }
}
