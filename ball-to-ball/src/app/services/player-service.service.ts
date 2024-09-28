/* eslint-disable @typescript-eslint/ban-types */
import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url ,constant } from 'src/Enviroment/enviroment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class PlayerServiceService {
  
  players: Array<any> = [];
  matches: Array<any> = [];
  constructor(private http: HttpClient,private router:Router) { 
    
  }

  getPlayer() {
    return this.http.get(`${url}`+constant.Player.fetch);
  }
  getScore(){
    return this.http.get(url)
  }

  addplayer(data: any) {
    return this.http.post(`${url}`+constant.Player.create, data)
  }
  getPlayersData() {
    return this.http.get(`${url}`+constant.Player.fetch)
  }
  postMatchData(data: any) {

    return this.http.post(`${url}`+constant.match.add, data);
  }
  getMatchDetails(today: boolean,page:any=false) {

    const body = { today: today,page:page,limit:13}
    
    return this.http.get(`${url}`+constant.match.fetch, { params: body });
  }

  formatDate(date: Date) {
    const tDate = new Date(date)
    let month = '' + (tDate.getMonth() + 1),
      day = '' + (tDate.getDate())
    const year = tDate.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  filterMatches(date: any) {
    return this.matches.filter((val) => { return val.date === date })
  }
  postLoginData(data:{}) {

     return this.http.post(`${url}`+constant.auth.login,data);
  }
  postSignupData(data: {}) {
    return this.http.post(`${url}`+constant.auth.signup, data);
  }

  getOneMatch(id: string | null, lastBall = false) {

    if (id) {
      const body = { "matchId": id, "lastBall": lastBall };
      return this.http.get(`${url}`+constant.match.fetchone, { params: body })
    }
    else {
      return new Observable((observer: any) => {
        observer.error("This Match Id Is Not Valid")
      })
    }
  }
  canActivate(): boolean  {

    const token =localStorage.getItem('token');
    if(token )
    {
      return true;
    }
    else
    {
      this.router.navigate(['matches']);
      return false;
    }
  }
  getMatchAnalytics(id:string)
  {
    const query={"matchId": id}
    return this.http.get(`${url}`+constant.match.analytics,{params:query})
  }

}
