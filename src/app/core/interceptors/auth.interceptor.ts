import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { selectAllAccessToken } from '../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { saveAccessToken } from '../store/auth/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  // Access token
  accessToken: string | undefined;


  constructor(public store: Store<AppState>){

    // Get the access token from store
    this.store.select(selectAllAccessToken).subscribe((access_token: string) => {
      this.accessToken = access_token
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Clone the request and set the header
    if (this.accessToken){
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.accessToken)
      })

    }

    // Resend the request
    return next.handle(request)

    //Check for any errors on the request
    .pipe(

      // Check if the request status code
      catchError((error: HttpErrorResponse) => {

        // If there is no access token, return the request
        if (!this.accessToken) { return throwError("No authentication token")}


        let url = request.url;

        // Check if the refresh token is valid
        if (error.status === 401 && url === "http://127.0.0.1:8000/accounts/auth/token/refresh/") {
          // Set the access token to an empty string in NGRX
          let access_token = ""
          this.store.dispatch(saveAccessToken({ access_token }));

        }

        // Pass the error to the calling code (components/services) so they can handle it further.
        return throwError(error);
        // return next.handle(request)
      })
    );
  }
}


export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
