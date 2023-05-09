import {Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import {Observable} from "rxjs";
import {AuthServices} from "./auth.services";

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthServices
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.auth.logout();
      this.router.navigate(['/admin', 'login'], {
        queryParams: {
          loginFirst: true
        }
      });
      return false
    }
  }

}
