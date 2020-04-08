import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy{

  @Output() closeSidenav = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription: Subscription;
  constructor(private AuthServiceService: AuthServiceService) { }


  ngOnInit() {
   this.authSubscription =  this.AuthServiceService.authChange.subscribe(authStatus => {
    this.isAuth = authStatus;
  });
  }
  ngOnDestroy(){
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }

  onClose() {
    this.closeSidenav.emit();
    this.AuthServiceService.logout();
  }
}
