import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { PaginationDirective } from 'src/app/Shared/pagination.directive';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, PaginationDirective],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  localStorageHandler:any=localStorage;
  @Input() matchList: Array<any> = [];
  date = '';
  @Input() route = ''
  token = localStorage.getItem('token');
  constructor(private router: Router, private playerservice: PlayerServiceService) {

    const todayDate = new Date();
    this.date = this.playerservice.formatDate(todayDate);
    
  }
  OnViewDetails(id: string) {

    this.router.navigate([this.route, id])
  }
  OnliveDetails(id: string) {

    this.router.navigate(['livescores', id])
  }
  OnAddScore(id: string) {
    console.log(this.matchList)
    const token = localStorage.getItem('token');
    if ((token === null)) {
      this.router.navigateByUrl('login');
    }
    else {
      this.router.navigate(['/match/addscore', id])
    }
  }
  formatDate(date: Date) {
    return this.playerservice.formatDate(date);
  }
}
