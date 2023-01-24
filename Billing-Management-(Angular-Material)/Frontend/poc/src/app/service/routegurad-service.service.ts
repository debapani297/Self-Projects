import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LogInServiceService } from './log-in-service.service';

@Injectable({
  providedIn: 'root'
})
export class RouteguradServiceService {

  constructor(private service:LogInServiceService,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    if (this.service.isUserLoggedIn()){
      return true;
    }else{
      this.router.navigate(['']);
      return false;
    }
  }
}
