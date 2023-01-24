import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service:LogInServiceService,private router:Router) { }

  ngOnInit(): void {
     this.service.logout();
  }

}


