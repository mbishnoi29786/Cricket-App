import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-team1-batting-complete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-team1-batting-complete.component.html',
  styleUrls: ['./alert-team1-batting-complete.component.css']
})
export class AlertTeam1BattingCompleteComponent {
  matchId:any;

  constructor(private modalService: NgbModal,private router: Router) {

    setTimeout(() => {
       this.modalService.dismissAll();

      // router.navigate(['/match/addscore/',alert_route]);
    }, 2000);

  }
}
