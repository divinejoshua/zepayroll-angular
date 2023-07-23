import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { selectAllAccessToken } from '../store/auth/auth.selectors';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {



  // constructor
  constructor(public store: Store<AppState>, private router: Router){
  }



  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.select((state: AppState) => state.auth).pipe(
        map((authState: any) => {
          if (authState.access_token) {
            console.log(authState.access_token)
            // If the access token exists, allow the user to access the route
            return true;
          } else {
            // If there is no access token, redirect the user to the login page (or any other route)
            // this.router.navigate(['/accounts/login']); // Replace '/login' with the appropriate login route
            return false;
          }
        })
      );

  }

}
