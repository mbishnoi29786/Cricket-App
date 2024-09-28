import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-game-over',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-game-over.component.html',
  styleUrls: ['./alert-game-over.component.css']
})
export class AlertGameOverComponent {
  constructor(private modalService: NgbModal,private router: Router) {
    setTimeout(() => {
      this.modalService.dismissAll();
      router.navigate(['/matches']);
    }, 2000);

  }
}
