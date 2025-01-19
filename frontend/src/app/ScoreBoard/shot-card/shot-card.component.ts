import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VisualFieldComponent } from '../visual-field/visual-field.component';
@Component({
  selector: 'app-shot-card',
  standalone: true,
  imports: [CommonModule,NgbDatepickerModule,RouterModule],
  templateUrl: './shot-card.component.html',
  styleUrls: ['./shot-card.component.css'],
  providers:[]
})
export class ShotCardComponent {
  closeResult = '';

	constructor(private modalService: NgbModal) {}

	open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    .result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
				this.modalService.open(VisualFieldComponent);

        //
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

}
