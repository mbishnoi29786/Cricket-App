import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, Router} from "@angular/router";
import { LoginComponent } from "../components/login/login.component";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate, CanDeactivate<LoginComponent>{


    constructor(private router:Router){}
    canDeactivate(): boolean  {
        return localStorage.getItem('token')!=null;
    }

    canActivate(): boolean {

        if(localStorage.getItem('token')!==null)
        {
            this.router.navigate(['matches'])
            return false;
        }
        else
        {
            return true;
        }
    }

 }
