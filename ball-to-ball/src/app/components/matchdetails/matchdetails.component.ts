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
  overs:any;
  matchdate = new Date();
  todayMatch: Array<any> = [];
  status: number | undefined;
  constructor(private playerservice: PlayerServiceService, private activatedroute: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {

    this.Id = this.activatedroute.snapshot.paramMap.get('id')
    this.playerservice.getOneMatch(this.Id).subscribe((res: any) => {
      this.matchDetail.push(res.match);
      const date = this.playerservice.formatDate(this.matchdate)
      const todayMatchdate = this.playerservice.formatDate(this.matchDetail[0].date)
      this.playerservice.getMatchDetails(true,1).subscribe((res : any) => {
        this.todayMatch=res.matches;
      })

      if (date === todayMatchdate) {
        this.status = 1;
      }
      else if (date < todayMatchdate) {
        this.status = 2;
      }
      else {
        this.status = 0;
      } 
    }, (err) => {
      if (localStorage.getItem('token')) {
        console.log(err)
        this.router.navigate(['matches']);
      }
    })

  }
  toLiveScore() {
    this.router.navigate(['livescores', this.Id])
  }
  routeToGiven(route:string) {
    this.router.navigate([route, this.Id])
  }
  
}
