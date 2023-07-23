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
      return new Observable((subscriber) => {

        this.store.select(selectAllAccessToken)
        .subscribe((access_token) => {
          // Check for access token
          if (access_token) {
            // Grant access
            subscriber.next(true);
            return true;

          } else {

            // if no access Token ??
            //   -  wait for few seconds incase the token is still been retrieved from API.
            //   -  If after a few seconds, the token wasnt retrieved, then it will redirect to the the login page
            setTimeout(() => {
              subscriber.next(this.router.parseUrl('/accounts/login'));
            }, 2000);
            return false;

          }

        });

      });



  }

}
