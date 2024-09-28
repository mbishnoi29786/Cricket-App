import { Component } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-selected-new-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-selected-new-player.component.html',
  styleUrls: ['./alert-selected-new-player.component.css']
})
export class AlertSelectedNewPlayerComponent {
  constructor(private modalService: NgbModal) {
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 2000);

  }
}
