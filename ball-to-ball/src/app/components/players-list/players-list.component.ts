import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from 'src/app/custom_pipe/filter.pipe';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule,FilterPipe,NgxPaginationModule],
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {
  page = 1;
  count = 0;
  tableSize = 7;
  searchbar='';
  playerData:any
  IndexTable=this.tableSize;
  constructor(private data: PlayerServiceService,private router:Router)  {
  }
  ngOnInit(){
    this.data.getPlayer().subscribe((res: any) => {
      this.playerData = res;
      this.playerData=this.playerData?.players;
    })
  }
OnClick(id:any){
   return this.router.navigate(['/players',id]);
}
OnSubmit(event:string){
  return this.router.navigate([event]);
}
pageIndex(){
      if(this.page>1){
        for(let i=0;i<7;i++){
          if(this.page>2){
            return this.tableSize*this.page-2;
          }
          return this.tableSize;
        }
      }
      return 0;
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.data.getPlayer().subscribe((res: any) => {
      this.playerData = Object.keys(res).map((key) => { return res[key] });
    })

  }

}





