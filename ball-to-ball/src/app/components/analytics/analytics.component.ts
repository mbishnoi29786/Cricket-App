import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { graphs,set_graph_type } from 'src/app/Shared/add_score_button';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit { 
  graphs=graphs
  type:any;
  overs:Array<number>=[];
  team1Runs:Array<number>=[];
  team2Runs:Array<number>=[];
  constructor(private playerservice:PlayerServiceService,private activatedroute:ActivatedRoute,private graphservice:GraphService){}

  onChange(event:any){
    this.type=event.target?.value;
    set_graph_type(this.type)
    this.graphservice.emitSignal();
  }
  ngOnInit(): void {
    const id=this.activatedroute.snapshot.paramMap.get('id');
    if(id)
    {
      this.playerservice.getMatchAnalytics(id).subscribe((res:any)=> {
        if(res.analytics.length)
        {
          for(const index in res.analytics)
          {
            this.overs.push(Number(index)+1);
            this.team1Runs.push(res.analytics[Number(index)]?.team1Runs);
            this.team2Runs.push(res.analytics[Number(index)]?.team2Runs);
          }
        }
        else
        {
          this.overs.push(1);
            this.team1Runs.push(1);
            this.team2Runs.push(1);
        }
        
      })
    }
  }
}
