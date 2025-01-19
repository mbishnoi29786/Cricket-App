import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-enter-valid-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-enter-valid-player.component.html',
  styleUrls: ['./alert-enter-valid-player.component.css']
})
export class AlertEnterValidPlayerComponent {
  constructor(private modalService: NgbModal) {
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 2000);

  }
}
