
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { PlayerServiceService } from 'src/app/services/player-service.service';
@Component({
  selector: 'app-matchform',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './matchform.component.html',
  styleUrls: ['./matchform.component.css'],
})
export class MatchformComponent implements OnInit {
  players: Array<any> = [];
  team1: Array<any> = [];
  team2: Array<any> = [];
  date = "";
  team1name = "";
  team2name = "";
  constructor(private dataService: PlayerServiceService, private router: Router) {
  }

  teamAFlag = true;
  onTeamAInput(event: Event) {
    if (event) {

      this.teamAFlag = false;
    }
  }
  teamBFlag = true;
  onTeamBInput(event: Event) {
    if (event) {
      this.teamBFlag = false;
    }
  }
  inputFlag = true;
  onInput(event: Event) {
    if (event) {
      this.inputFlag = false;
    }
  }

  onPopUp(index: number, team: string) {
    let array: Array<any> = [];
    if (team === 'a') {
      array = this.team1.splice(index, 1);
    } else {
      array = this.team2.splice(index, 1);
    }
    this.players.push(array[0]);
  }

  onSelection(event: any, team: string) {

    const index = this.players.findIndex((res: any) => res.id === event.target.value);
    if (team === 'a') {

      this.team1.push(this.players[index]);
    }
    else {
      this.team2.push(this.players[index]);
    }
    this.players.splice(index, 1);

  }
  onSubmit(data: NgForm) {

    if (this.team1.length !== 11 || this.team2.length !== 11) {
      alert("Each Team Should Have 11 Players")
    }
    else {

      const matchdata: any = {};
      matchdata.team1Name = data.value.teamA;
      matchdata.team2Name = data.value.teamB;
      matchdata.team1Players = [];
      matchdata.team2Players = [];
      for (const player of this.team1) {
        matchdata.team1Players.push(player.id)
      }
      for (const player of this.team2) {
        matchdata.team2Players.push(player.id)
      }
      matchdata.date = data.value.date;
      matchdata.venue = 'India';
      matchdata.totalOvers = 20;
      matchdata.firstBattingTeam = data.value.bating;
      this.dataService.matches.push(matchdata);
      this.dataService.postMatchData(matchdata).subscribe(() => {
        this.router.navigateByUrl("matches")
      });

    }


  }

  ngOnInit() {
    this.dataService.getPlayersData().subscribe((res: any) => {
      this.players = res.players;
    })
    const todaydate = new Date();
    this.date = this.dataService.formatDate(todaydate);
  }
}
