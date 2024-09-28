import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { PlayerServiceService } from './services/player-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports:[CommonModule,NavBarComponent,RouterModule],
  providers :[PlayerServiceService]
})
export class AppComponent {

  title = 'cricket_app';
  

}

