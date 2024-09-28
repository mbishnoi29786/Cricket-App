import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertEnterValidPlayerComponent } from 'src/app/Shared/alert-enter-valid-player/alert-enter-valid-player.component';
@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent {

  constructor(private data: PlayerServiceService, private router: Router,private modalService:NgbModal) { }
  playerform = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    age: new FormControl(18, [Validators.required, Validators.min(18), Validators.max(50)]),
    jerseyNo: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    team: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  })

  submit() {
    if(!this.playerform.valid){
      this.modalService.open(AlertEnterValidPlayerComponent);

      }
      else{
        this.data.addplayer(this.playerform.value).subscribe()
        this.clearForm();
    this.router.navigate(['/players']);
  }}
   
  
  get controls() {
    return this.playerform.controls
  }

  clearForm() {
    this.playerform.reset({
      'firstName': '',
      'lastName': '',
      'age': 18,
      'jerseyNo': '',
      'team': '',
      'type': ''
    });
  }
}