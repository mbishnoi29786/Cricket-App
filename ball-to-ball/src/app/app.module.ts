import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlayerServiceService } from './services/player-service.service';
import { InterceptorService } from './services/interceptor.service';
import { DeepInsightsComponent } from './components/deep-insights/deep-insights.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { PiechartComponent } from './ScoreBoard/Graph/piechart/piechart.component';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { BargraphComponent } from "./ScoreBoard/Graph/bargraph/bargraph.component";


@NgModule({
    declarations: [
        DeepInsightsComponent,
        PiechartComponent,
        AnalyticsComponent,
    ],
    providers: [{ provide: JsonPipe },
        PlayerServiceService,
        { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
    ],
    bootstrap: [],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        NgxPaginationModule,
        BrowserAnimationsModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({ positionClass: 'inline' }),
        ToastContainerModule,
        BargraphComponent
    ]
})
export class AppModule { }
