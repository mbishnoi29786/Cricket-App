import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-matchlist',
  standalone: true,
  templateUrl: './matchlist.component.html',
  styleUrls: ['./matchlist.component.css'],
  imports: [CommonModule, RouterModule, TableComponent]
})
export class MatchlistComponent implements OnInit {

  matchlist:any=[];
  date='';
  route='match'
  page =0;
  totalPages !: number;
  


  constructor(private playerservice:PlayerServiceService ,private router :Router){}

  OnViewDetails(index: number) {

    this.router.navigate(['/match', index])
  }

  filterMatches(event: Event) {

    this.date = (<HTMLInputElement>event.target).value;
    this.matchlist = this.playerservice.matches.filter((val: any) => {
      return String(val.date.split('T').at(0)) === String(this.date)
    });

  }

  ngOnInit(): void {
    this.getMatches(true,this.page+1)
  }

  getMatches(flag:boolean,page:number) {
    this.playerservice.getMatchDetails(false,page).subscribe((response: any) => {
      this.matchlist = response.matches;
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
  reset() {
    this.matchlist = this.playerservice.matches;
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
 

}
