import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PlayerServiceService } from 'src/app/services/player-service.service';
@Component({
  selector: 'app-player-stats',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {
  player: any = {}
  playerData: any
  constructor(private route: ActivatedRoute, private data: PlayerServiceService, private router: Router) {
  }
  ngOnInit() {
    this.data.getPlayer().subscribe((res: any) => {
      this.playerData = res;
      this.playerData = this.playerData?.players;
      const routeParams = this.route.snapshot.paramMap;
      const playerIdFromRoute = routeParams.get('id');
      this.player = this.playerData.find((players: any) => players.id === playerIdFromRoute);
    })
  }
  OnClick() {
    this.router.navigate(['/players'])
  }

}
