import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from './../../auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription: Subscription;


  constructor(private AuthServiceService: AuthServiceService) { }

  ngOnInit() {
    this.authSubscription = this.AuthServiceService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
  ngOnDestroy() {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  logOut(){
    this.AuthServiceService.logout();
  }
}
