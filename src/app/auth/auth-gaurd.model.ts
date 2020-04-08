import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment
} from "@angular/router";

import { AuthServiceService } from "./auth-service.service";

@Injectable()
export class AuthGuard implements CanActivate , CanLoad{
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }


}
