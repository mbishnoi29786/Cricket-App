// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {Route,provideRouter} from '@angular/router';
import { AddPlayerComponent } from './app/components/add-player/add-player.component';
import { PlayersListComponent } from './app/components/players-list/players-list.component';
import { PlayerStatsComponent } from './app/components/player-stats/player-stats.component';
import { PlayerServiceService } from './app/services/player-service.service';
import { importProvidersFrom } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatchlistComponent } from './app/components/matchlist/matchlist.component';
import { MatchformComponent } from './app/components/matchform/matchform.component';
import { MatchdetailsComponent } from './app/components/matchdetails/matchdetails.component';
import { ShotCardComponent } from './app/ScoreBoard/shot-card/shot-card.component';
import { LiveScoresComponent } from './app/components/live-scores/live-scores.component';
import { TodaysmatchComponent } from './app/components/todaysmatch/todaysmatch.component';
import { AddscoreComponent } from './app/components/addscore/addscore.component';
import { LoginComponent } from './app/components/login/login.component';
import { AuthService } from './app/services/authservice.service';
import { DeepInsightsComponent } from './app/components/deep-insights/deep-insights.component';
import { InterceptorService } from './app/services/interceptor.service';
import { NavBarComponent } from './app/components/nav-bar/nav-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from './app/services/toastr.service';
import { AnalyticsComponent } from './app/components/analytics/analytics.component';
const routes:Route[]=[
  {path:'',redirectTo:'matches',pathMatch:'full'},
  {path:'graph/:id',component:AnalyticsComponent},
  {path:'players',component:PlayersListComponent},
  {path:'add_player',component:AddPlayerComponent},
  {path:'players/:id',component:PlayerStatsComponent},
  {path:'matches',component:MatchlistComponent},
  {path:'matchform',component:MatchformComponent, canActivate:[PlayerServiceService]},
  {path:'match/:id',component:MatchdetailsComponent},
  {path:'shots',component:ShotCardComponent},
  {path:'livescores/:id',component:LiveScoresComponent},
  {path:'todaymatch',component:TodaysmatchComponent},
  {path:'match/addscore/:id',component:AddscoreComponent},
  {path:'login',component:LoginComponent,canActivate:[AuthService]},
  {path:'deep-insight/:id',component:DeepInsightsComponent},
  {path:'navbar',component:NavBarComponent},
  {path: '**',component:MatchlistComponent}

]

bootstrapApplication(AppComponent,{
  providers:[
    provideRouter(routes),
    PlayerServiceService,
    importProvidersFrom(HttpClientModule),
    {provide:HTTP_INTERCEPTORS, useClass:InterceptorService,multi:true},
    BrowserAnimationsModule,
    ToastrModule,
    ToastrService
  ]
})
.catch(err => console.error(err));
