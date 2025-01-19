import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-game-over',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-game-over.component.html',
  styleUrls: ['./alert-game-over.component.css']
})
export class AlertGameOverComponent implements OnDestroy {
  private modalCloseTimeout: any;

  constructor(private modalService: NgbModal, private router: Router) {
    this.modalCloseTimeout = setTimeout(() => {
      this.modalService.dismissAll();
      this.router.navigate(['/matches']);
    }, 2000);
  }

  ngOnDestroy() {
    // Clear the timeout if the component is destroyed before the timeout
    if (this.modalCloseTimeout) {
      clearTimeout(this.modalCloseTimeout);
    }
  }
}
    