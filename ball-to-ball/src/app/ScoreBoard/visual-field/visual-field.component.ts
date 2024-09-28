import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-visual-field',
  standalone: true,
  imports: [CommonModule,NgbDatepickerModule],
  templateUrl: './visual-field.component.html',
  styleUrls: ['./visual-field.component.css'],
  providers:[]
})
export class VisualFieldComponent {
	constructor(private modalService: NgbModal) {}
  closeResult = '';
  color = 'red';
  click=0;
  Refrence:any;
  ChangeColor(event: MouseEvent) {
    const target = event.target as HTMLElement;
    this.click++;
    if(this.click===1){
    target.style.setProperty('--c', 'green');
    this.modalService.dismissAll()


    }
    this.color = 'green';

 }

}
