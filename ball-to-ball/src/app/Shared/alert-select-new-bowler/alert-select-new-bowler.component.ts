import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-alert-select-new-bowler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-select-new-bowler.component.html',
  styleUrls: ['./alert-select-new-bowler.component.css']
})
export class AlertSelectNewBowlerComponent {
  constructor(private modalService: NgbModal) {
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 2000);

  }
}
