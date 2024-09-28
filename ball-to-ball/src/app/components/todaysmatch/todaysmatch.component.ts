/* eslint-disable @typescript-eslint/ban-types */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from "../table/table.component";
import { PlayerServiceService } from 'src/app/services/player-service.service';

@Component({
  selector: 'app-todaysmatch',
  standalone: true,
  templateUrl: './todaysmatch.component.html',
  styleUrls: ['./todaysmatch.component.css'],
  imports: [CommonModule, TableComponent],
})
export class TodaysmatchComponent implements OnInit {
  total_matches: any;
  todayMatch: Array<{ teamA: {}, teamB: {}, date: Date }> = [];
  page =0;
  totalPages !: number;
  constructor(private playerservice: PlayerServiceService) {
  }
    route="match"
  

  ngOnInit() {
    this.getMatches(true,this.page+1)
  }
  onPreviousClick() {
    if(this.page-1>=0)
    {
      this.getMatches(false,this.page-1)
    }
  }

  onNextClick() {
    if(this.page+1<=this.totalPages)
    {
      this.getMatches(true,this.page+1)
    }
  }
  getMatches(flag:boolean,page:number) {
    this.playerservice.getMatchDetails(true,page).subscribe((response: any) => {
      this.todayMatch = response.matches;
      this.playerservice.matches = response.matches
      if(flag){
        this.page++;
      }
      else {
        this.page--;
      }
      this.totalPages=Math.ceil(response.count/10)
    })
  }
}
