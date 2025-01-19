/* eslint-disable prefer-const */
import { Component, AfterViewChecked,AfterViewInit,ChangeDetectorRef,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { exp_batsman,batsDetails,Out } from 'src/app/Shared/add_score_button';
import { common,valid_ball,set_alert_route } from 'src/app/Shared/add_score_button';
import { IsNaNPipe } from 'src/app/custom_pipe/is-na-n.pipe';
import {  FormsModule,ReactiveFormsModule } from '@angular/forms';
import { shots,bowler,bowlerDetails,UpdateScore,ScoreDetails,UndoUpdateDetails,UndoUpdateScore } from 'src/app/Shared/add_score_button';
import { AlertSelectNewBowlerComponent } from 'src/app/Shared/alert-select-new-bowler/alert-select-new-bowler.component';
import { AlertGameOverComponent } from 'src/app/Shared/alert-game-over/alert-game-over.component';
import { url } from 'src/Enviroment/enviroment';
import { AlertTeam1BattingCompleteComponent } from 'src/app/Shared/alert-team1-batting-complete/alert-team1-batting-complete.component';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-addscore',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,IsNaNPipe],
  templateUrl: './addscore.component.html',
  styleUrls: ['./addscore.component.css']
})
export class AddscoreComponent implements AfterViewChecked,AfterViewInit,OnInit {

  requestRecovery:any=[];
  overscore: any = [];
  submitScore:any
  buttonsData:any=Out
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  validBall:any=valid_ball
  Striker_value=true;
  non_Striker_value=true;
  bowler_value=true;
  ballsCount=0;
  runs=0;
  byes=false;
  validity:any='';
  wicketType:any=undefined;
  wicketPlayerId:any=undefined;
  disabled = false;
  bowlerBowled:any;
  playersPlayed:any=[]
  Batsman1:any;
  Batsman2:any;
  bowler_name:any;
  shots=shots
  button = common
  lastScore:any=[];
  score: any =Number(0);
  totalScore: any =Number(0);
  team:any;
  previous_validity='valid'
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  over:number=0;
  ball_no=0;
  BatsmanDisplay=false;
  overBall:any=Number(0);
  totalBall:any=Number(1);
  matchId:any;
  striker_player:any;
  non_striker_player:any;
  bowler:any;
  strikerPlayerRuns:any;
  nonStrikerPlayerRuns:any;
  bowler_:any;
  matchData:any;
  Team1:any=[];
  closeResult:any;
  MatchId:any;
  currentStriker:any;
  currentNonStriker:any;
  currentBowler:any;
  totalRuns:any;
  battingTeam:any;
  bowlingTeam:any;
  OverNo:any=0;
  liveWickets:any;
  localStorageHandler=localStorage;
  constructor(private route: ActivatedRoute,
    private data: PlayerServiceService,
    private http: HttpClient,
    private changeDetection:ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService) {

      const routeParams = this.route.snapshot.paramMap;
      const matchIdFromRoute = routeParams.get('id');
      this.matchId=matchIdFromRoute;

      if (!matchIdFromRoute) {
        console.error('Match ID is missing from the route.');
        return;
      }

      this.data.getOneMatch(this.matchId,true).subscribe((res:any)=>{
        if (!res.match) {
          console.error('Match data not found.');
          return;
        }
        this.matchData=res.match;
        localStorage.setItem(this.matchId,JSON.stringify(this.matchData))
        console.log(this.matchData)
        if (res.match.firstBattingTeam === 1) {
          this.team = (res.match?.firstTeamBattingComplete !== true) ? res.match?.lastBallTeam1 : res.match.lastBallTeam2;
          this.totalRuns = (res.match?.firstTeamBattingComplete !== true) ? res.match?.team1Runs : res.match.team2Runs;
          this.battingTeam = (res.match?.firstTeamBattingComplete !== true) ? res.match?.team1Players : res.match.team2Players;
          this.bowlingTeam = (res.match?.firstTeamBattingComplete !== true) ? res.match?.team2Players : res.match.team1Players;
          this.liveWickets=(res.match?.firstTeamBattingComplete !== true)?res.match?.team1FallOfWickets.length:res.match?.team2FallOfWickets.length;
        } else if (res.match.firstBattingTeam === 2) {
          this.team = (res.match.firstTeamBattingComplete !== true) ? res.match.lastBallTeam2 : res.match.lastBallTeam1;
          this.totalRuns = (res.match?.firstTeamBattingComplete !== true) ? res.match.team2Runs : res.match.team1Runs;
          this.battingTeam = (res.match?.firstTeamBattingComplete !== true) ? res.match.team2Players : res.match.team1Players;
          this.bowlingTeam = (res.match?.firstTeamBattingComplete !== true) ? res.match.team1Players : res.match.team2Players;
          this.liveWickets=(res.match?.firstTeamBattingComplete !== true)?res.match?.team2FallOfWickets.length:res.match?.team1FallOfWickets.length;
        } else {
          console.error('Invalid value for firstBattingTeam:', res.match.firstBattingTeam);
          return;
        }

        this.OverNo = (this.team && !isNaN(this.team.overNo)) ? this.team.overNo : 0;

        const striker = this.battingTeam.find((val: any) => val.playerId == this.team?.playerOnStrikeId);
        const nonStriker = this.battingTeam.find((val: any) => val.playerId == this.team?.playerOnNonStrikeId);
        
        if (striker) {
            this.striker_player = striker.playerName;
            this.strikerPlayerRuns = striker.playerRuns;
        }
        if (nonStriker) {
            this.non_striker_player = nonStriker.playerName;
            this.nonStrikerPlayerRuns = nonStriker.playerRuns;
        }

        const bowler = this.bowlingTeam.find((val: any) => val.playerId == this.team?.bowlerId);
        if (bowler) {
            this.bowler_name = bowler.playerName;
            localStorage.setItem('bowlerBowled', this.team?.bowlerId);
        }

        this.ball_no = (this.team && !isNaN(this.team.ballNo)) ? this.team.ballNo : 0;
        this.ballsCount = this.ball_no;
        if (this.team) {
          this.Striker_value = !this.team.playerOnStrikeId;
          this.non_Striker_value = !this.team.playerOnNonStrikeId;
        }
      })
    }

    OnBallChange(ballId: any, event: any) {
      this.validity = event.target.value;
      console.log(this.validity);
      
      let selectedBall = this.validBall.find(ball => ball.id === ballId);
      
      if (!selectedBall) {
          console.error('Ball with provided ID not found');
          return;
      }
  
      this.validBall.forEach(ball => {
          if (ball.id !== ballId) {
              ball.isSelected = false;
          }
      });
  
      if (this.validity === 'byes') {
          this.byes = true;
          if (this.validBall.some(ball => ball.isBye && ball.isSelected)) {
              this.validity = 'noball';
          } else {
              this.validity = 'valid';
          }
      } else {
          this.byes = selectedBall.isBye;
          if (this.validity === 'noball') {
              const noBallOption = this.validBall.find(ball => ball.label === 'noball');
              if (noBallOption) {
                  noBallOption.isSelected = true;
              }
          }
      }
    }
  
  // Runs_data to local session
  Runs_Data:any=[]
  Bowler_Data:any=[]
  ngOnInit() {
    this.ballsCount=0;
  }

  UndoAll() {
    UndoUpdateDetails(
      this.matchId,
      this.runs, this.byes,
      this.validity,
      this.wicketType,
      this.wicketPlayerId
    );
  
    const token = localStorage.getItem('token');
    
    if (this.ballsCount === 1) {
      this.ballsCount = 7;
    }
  
    this.ballsCount--;
    if (this.ballsCount === 6) {
      this.OverNo--;
    }
  
    if (token != null) {
      const headers = new HttpHeaders({ 'authToken': token });
  
      if (!exp_batsman.newBatsmanId1) {
        exp_batsman.newBatsmanId1 = exp_batsman.newBatsmanId2;
        exp_batsman.newBatsmanId2 = "undefined";
      }
  
      // Call undo API
      const res = this.http.put(`${url}/matches/undoUpdateScore`, UndoUpdateScore, { headers: headers });
  
      res.subscribe(
        (res: any) => {
          console.log("Undo successful", res);
  
          // Update frontend score immediately after API call
          if (res && res.body?.updatedScore !== undefined) {
            this.totalRuns = res.body.updatedScore;  // Sync totalRuns with updated score from the backend
          }
  
          if (res.body?.ballsCount !== undefined) {
            this.ballsCount = res.body.ballsCount;  // Sync ball count
          }
          
        },
        (error: any) => {
          console.error("Undo failed", error);
          this.toastr.emitError("Failed to undo score update");
        }
      );
    }
  }
  
  open(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngAfterViewInit(): void {
    this.changeDetection.detectChanges();
  }
  ngAfterViewChecked(): void {
    this.changeDetection.detectChanges();
  }
  
  onAddscore(event: any) {
    // Ensure the event target value is a valid number
    const newScore = Number(event.target.value);
    if (isNaN(newScore)) {
        console.error('Invalid score input:', event.target.value);
        return;  // Stop execution if input is not a valid number
    }

    // Case for no-ball with byes true
    if (this.validity === 'noball' && this.byes === true) {
        this.previous_validity = this.validity;
        this.runs = newScore;  // Use validated numeric score
        this.AddScore();
        this.byes = false;
        return;
    }

    // Case for previous validity being 'wide'
    if (this.previous_validity === 'wide') {
        this.totalScore = newScore;
        this.previous_validity = 'valid';
        this.validity = 'valid';
        this.runs = newScore;

        this.strikerPlayerRuns += this.totalScore;
        this.totalRuns += this.totalScore;

        this.AddScore();
    }

    // Case for previous validity being 'noball'
    if (this.previous_validity === 'noball') {
        this.totalScore = newScore;
        this.previous_validity = 'valid';
        this.validity = 'valid';
        this.runs = newScore;

        this.strikerPlayerRuns += this.totalScore;
        this.totalRuns += this.totalScore;

        this.AddScore();
        return;
    }

    // Case for wide or no-ball validities
    if (this.validity === 'wide' || this.validity === 'noball') {
        this.previous_validity = this.validity;
        this.runs = newScore;
        this.AddScore();
        return;
    }

    // Regular score update for valid balls
    this.ballsCount++;
    this.totalScore = newScore;
    this.validity = 'valid';
    this.runs = newScore;

    this.strikerPlayerRuns += this.totalScore;
    this.totalRuns += this.totalScore;

    this.AddScore();
  }

  OnSelect(event: any, val: any) {
    console.log(typeof(event.target.value));
    
    const values = event.target.value.split(',');
    
    if (values.length !== 2) {
      console.error('Invalid input format');
      return;
    }
  
    if (val === 1) {
      this.Batsman1 = values[0];
      this.team.playerOnStrikeId = values[0];
      this.striker_player = values[1];
      this.strikerPlayerRuns = 0;
      this.Striker_value = false;
      
      batsDetails(this.matchId, this.Batsman1, this.Batsman2);
      
      if (!this.Striker_value && !this.non_Striker_value) {
        this.OnSubmit();
      }
    }
  
    if (val === 2) {
      this.Batsman2 = values[0];
      this.team.playerOnNonStrikeId = values[0];
      this.non_striker_player = values[1];
      this.non_Striker_value = false;
      this.nonStrikerPlayerRuns = 0;
      
      batsDetails(this.matchId, this.Batsman1, this.Batsman2);
      
      if (!this.Striker_value && !this.non_Striker_value) {
        this.OnSubmit();
      }
    }
  
    if (val === 3) {
      this.bowler = values[0];
      this.bowler_name = values[1];
      this.bowler_value = false;
      
      bowlerDetails(this.matchId, this.bowler);
      this.nextBowler();
    }
  
    batsDetails(this.matchId, this.Batsman1, this.Batsman2);
  }
  
  OnSubmit() {
    this.BatsmanDisplay = true;
  
    // Add striker and non-striker to playersPlayed list
    this.playersPlayed.push(this.striker_player);
    this.playersPlayed.push(this.non_striker_player);
  
    // Update team1Players by filtering out the selected players
    this.matchData.team1Players = this.matchData?.team1Players?.filter((val: any) => {
      return !(this.playersPlayed.includes(val.playerName));
    });
  
    // Set striker and non-striker values to false
    this.Striker_value = false;
    this.non_Striker_value = false;
  
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (token != null) {
      const headers = new HttpHeaders({ 'authToken': token });
  
      // Ensure that newBatsmanId1 and newBatsmanId2 are correctly set
      if (!exp_batsman.newBatsmanId1) {
        exp_batsman.newBatsmanId1 = exp_batsman.newBatsmanId2;
        exp_batsman.newBatsmanId2 = "undefined"; 
      }
  
      // Send HTTP PATCH request to update the next batsman
      this.http.patch(`${url}/matches/selectNextBatsman`, exp_batsman, { headers: headers })
        .subscribe({
          next: (res: any) => {
            // Handle successful response
            console.log('Next batsman updated successfully:', res);
          },
          error: (err) => {
            // Handle error response
            console.error('Error updating batsman:', err);
          }
        });
    }
  }
  
  Out(event:any){
    this.BatsmanDisplay=false;
    this.runs=0;
    this.validity='valid';
    this.Striker_value=true;
    this.striker_player=''
    this.ballsCount++;

    this.wicketType=event.target.value
    this.disabled = false;
    this.AddScore();
  }
  runOut(event:any,playerType:any){
    this.BatsmanDisplay=false;

      this.validity='valid';

      this.battingTeam?.find((val: any) => {

        if (val.playerName == event) {
          if (
            this.team?.playerOnStrikeId === val.playerId ||
            this.team?.playerOnNonStrikeId === val.playerId
          ) {
            this.wicketPlayerId = val.playerId;
            this.ballsCount++;
            this.wicketType = 'runout';
            if (playerType === 'striker_player') {
              this.Striker_value = true;
              this.non_Striker_value = false;
            }
            if (playerType === 'non_striker_player') {
              this.non_Striker_value = true;
              this.Striker_value = false;
            }
            this.AddScore();
          }
        }
      });

  }
  nextBowler(){
    this.disabled=false;
    localStorage.setItem('bowlerBowled',bowler.newBowlerId)
    const token= localStorage.getItem('token');
    if(token!=null){
      const headers=new HttpHeaders({ 'authToken': token })

      const res= this.http.patch(`${url}`+'/matches/selectNextBowler',bowler,{headers:headers});
      res.subscribe((res:any)=>res)
  }}
  swapOnStroker_Non(){
    [this.striker_player,this.non_striker_player,this.strikerPlayerRuns,this.nonStrikerPlayerRuns]=
    [this.non_striker_player,this.striker_player,this.nonStrikerPlayerRuns,this.strikerPlayerRuns]
  }

  AddScore(){
    this.disabled=false;
    this.validBall[0].isselected=false;
    this.validBall[1].isselected=false;
    this.validBall[2].isselected=false;
    this.ball_no++;

    // Update score details
    ScoreDetails(this.matchId,this.runs,this.byes,this.validity,this.wicketType,this.wicketPlayerId);

    console.log(UpdateScore, "This is updated score")
    if(this.runs%2===0 && this.ball_no===7){   
      this.swapOnStroker_Non()
    }
    if(this.runs%2!==0){
      if(this.ball_no!==7){
        this.swapOnStroker_Non()
    }}
    if(this.ballsCount==7){
      this.disabled=true;
      this.modalService?.open(AlertSelectNewBowlerComponent);
      this.ball_no=1;
      this.OverNo+=1;
      this.bowler_name=''
      this.ballsCount=this.ball_no
    }

    // Disable bowler selection if not first ball
    if(this.ballsCount===1){
      this.bowler_value=true
    }else{
      this.bowler_value=false;
    }

    // Store runs data
    this.Runs_Data.push(this.runs)
    localStorage.setItem('RunsData',this.Runs_Data)
    this.runs=0;
    this.wicketType=undefined;

    // Increment live wickets if a wicket has fallen
    const token= localStorage.getItem('token');
    if(UpdateScore.wicketType) {
      this.liveWickets++;
    }

    // Update the player performance data
    this.updatePlayerPerformance();

    // Update score in the backend
    if(token!=null){
      const headers=new HttpHeaders({ 'authToken': token })
      const res= this.http.put(`${url}`+'/matches/updateScore',UpdateScore,{headers:headers});

      res.subscribe((res:any)=>{
        UpdateScore.wicketPlayerId=undefined;
        res;
      }
      ,(error:any)=>{
        this.requestRecovery.push(UpdateScore)
        localStorage.setItem('recovery',this.requestRecovery)
        error;
      })
    }

    // End match conditions
    if(this.OverNo==20 || this.liveWickets==10){
      set_alert_route(this.matchId);
      this.modalService?.open(AlertTeam1BattingCompleteComponent);
      window.location.reload()
    }

    // Check match status for game over
    if(this.matchData?.firstTeamBattingComplete===true){
      const team1value=this.matchData?.team1Runs;
      const team2value=this.matchData?.team2Runs;
      const team1Overs=this.matchData?.lastBallTeam1?.overNo;
      const team2Overs=this.matchData?.lastBallTeam2?.overNo;
      console.log(team1Overs, " ",team2Overs);

      if(team2value > team1value && team1Overs===20 || this.liveWickets>=10){
        this.modalService?.open(AlertGameOverComponent);
      }
      if(team1value > team2value && team2Overs===20  ){
        this.modalService?.open(AlertGameOverComponent);
      }
    }
  }

  updatePlayerPerformance() {
    // Update striker's performance (runs, balls faced)
    const striker = this.battingTeam.find(player => player.playerId === this.team?.playerOnStrikeId);
    if (striker) {
      striker.playerRuns += this.runs; // Update the runs for striker
      striker.ballsFaced++; // Increment the balls faced for the striker
    }
  
    // Update bowler's performance (balls bowled, runs conceded)
    const bowler = this.bowlingTeam.find(player => player.playerId === this.team?.bowlerId);
    if (bowler) {
      bowler.ballsBowled++; // Increment the balls bowled for the bowler
      bowler.runsOnBowling += this.runs; // Increment the runs conceded by the bowler
    }
  
    // Optionally update the player's performance for wicket-taking (if wicketType is available)
    if (this.wicketType) {
      const player = this.bowlingTeam.find(player => player.playerId === this.team?.bowlerId);
      if (player) {
        player.playerWickets++; // Increment the wickets for the bowler
      }
    }
  }  
}

