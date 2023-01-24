import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  @Output() sidenavClose = new EventEmitter();
  isExpanded:boolean=false
  
 //userName=sessionStorage.getItem('authUser')
  constructor(public service:LogInServiceService) { }
userName:any
  ngOnInit(): void {
    this.userName=sessionStorage.getItem('authUser')
  }
  public onToggleSidenav = () => { 
    this.sidenavToggle.emit();

  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

logout(){
  
  this.service.logout();
  this.userName=""
}

login(){
  if(this.service.isAdmin()&& this.service.isUserLoggedIn()){
    return true;
  }else if(this.service.isVCM()&& this.service.isUserLoggedIn()){
    return true;
  }
  else if(this.service.isCCM()&& this.service.isUserLoggedIn()){
    return true;
  }
  else if(this.service.isAR()&& this.service.isUserLoggedIn()){
    return true;
  }
  else if(this.service.isAP()&& this.service.isUserLoggedIn()){
    return true;
  }else{
    return false;
  }
}

}
