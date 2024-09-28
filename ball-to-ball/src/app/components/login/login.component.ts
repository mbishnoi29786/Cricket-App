import { Component } from '@angular/core';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { AuthService } from 'src/app/services/authservice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone : true,
  imports : [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
string(arg0: any) {
return String(arg0)
}
checkPass(value:any){

   return  value[0]=='+'&&Number.isNaN(value.slice(1,value.length));
}
  constructor(private playerservice:PlayerServiceService,private router:Router, private authservice :AuthService){}
  onSignUp(data:any) {
    console.log(data.value)
    if(data.value.password === data.value.confirmPassword )
    {
      this.playerservice.postSignupData(data.value)
      .subscribe((res:any)=> {
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/matches')

      },(err)=>{err})
    }
  }
  onLogin(data:any){
    console.log(data.value)
    this.playerservice.postLoginData(data.value)
    .subscribe((res: any )=> {
      if(res.success)
      {
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/matches')
      }
    },(err)=>{
      err;
  })
}
}
