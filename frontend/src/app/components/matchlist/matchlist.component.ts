import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-matchlist',
  standalone: true,
  templateUrl: './matchlist.component.html',
  styleUrls: ['./matchlist.component.css'],
  imports: [TableComponent]
})
export class MatchlistComponent implements OnInit {
  matchlist: any[] = [];
  date = '';
  route = 'match';
  page = 0;
  totalPages!: number;

  constructor(private playerservice: PlayerServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getMatches(true, this.page + 1);  // Fetch data for the first page (1-based)
  }

  filterMatches(event: Event) {
    this.date = (<HTMLInputElement>event.target).value;
    this.matchlist = this.playerservice.matches.filter((val: any) => {
      return String(val.date.split('T')[0]) === String(this.date);
    });
  }

  reset() {
    this.matchlist = this.playerservice.matches;
  }

  getMatches(flag: boolean, page: number) {
    this.playerservice.getMatchDetails(false, page).subscribe((response: any) => {
      this.matchlist = response.matches;
      this.playerservice.matches = response.matches;
      if (flag) {
        this.page = page - 1;  // Set the zero-based page number
      } else {
        this.page = page - 1;
      }
      this.totalPages = Math.ceil(response.count / 10);
    });
  }

  onPreviousClick() {
    if (this.page > 0) {
      this.getMatches(false, this.page);
    }
  }

  onNextClick() {
    if (this.page + 1 < this.totalPages) {
      this.getMatches(true, this.page + 2);  
    }
  }
}
