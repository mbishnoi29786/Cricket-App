import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule ,Router} from '@angular/router';
import { ToasterModule } from '../toaster/toaster.module';
import { ToastrService } from 'src/app/services/toastr.service';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports:[CommonModule,RouterModule,ToasterModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router:Router ,private toastr:ToastrService){}
  title = 'cricket_app';
  localstoragehandler=localStorage;
  token = localStorage.getItem('token');
  OnClick(route:string){
    this.router.navigate([route])
  }
  onLoginButtonClick() {
    if(localStorage.getItem('token')=== null)
    {
      this.router.navigateByUrl('login');
    }
  }
  loginButtonDisplay() {
    if(localStorage.getItem('token')=== null)
    {
      return 'block'
    }
    else
    { return 'none'
    }
  }

  onLogoutButtonClick(){
      localStorage.clear();
      this.toastr.emitError("Logged-Out!")
      this.router.navigate(['matches']);

  }

  logoutButtonDisplay() {
    if(localStorage.getItem('token')!== null)
    {
      return 'block'
    }
    else
    { return 'none'
    }
  }
}
