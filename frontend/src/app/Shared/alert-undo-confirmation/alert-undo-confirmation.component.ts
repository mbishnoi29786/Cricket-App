import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-undo-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-undo-confirmation.component.html',
  styleUrls: ['./alert-undo-confirmation.component.css']
})
export class AlertUndoConfirmationComponent {
  constructor(private modalService: NgbModal) {}
  OnClick(){
    this.modalService.dismissAll();
  }

}
