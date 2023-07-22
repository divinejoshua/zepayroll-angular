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
import { catchError, delay, switchMap } from 'rxjs/operators';
import { selectAllAccessToken } from '../store/auth/auth.selectors';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { saveAccessToken } from '../store/auth/auth.actions';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  // Access token
  accessToken: string | undefined;

  // Base Url from environment variable
  baseUrl: string =  environment.apiUrl


  constructor(public store: Store<AppState>, private AuthService:AuthService){

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
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );

  }


  // Handle 401 error function
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let url = request.url;

    let oldRequest = request

      // If the error is coming from the refresh token api
      if (url === this.baseUrl+"accounts/auth/token/refresh/"){
        // Set the access token to an empty string in NGRX
        let access_token = ""
        this.store.dispatch(saveAccessToken({ access_token }));
        return throwError("Token expired")
      }

       // If there is no access token, return the request
       if (!this.accessToken) {
         return throwError("No authentication tokens")

       } else {

         //If there is an access token and its expired, Get a new access token and retry the main request
         this.AuthService.getNewAccessToken()
         .pipe(
          catchError((error) => {
            // Handle errors, if any
            return []; // Return a default value or handle the error as required
          })
        ).subscribe(
          (data) => {
            // Do something with the data
            console.log('Received data:', data);
          },
          (error) => {
            // Handle errors, if any
            console.log('Error occurred:', error);
          }
        );


        //  .pipe(
      //     switchMap(() => {
      //         console.log("Got here")

      //         return next.handle(request);
      //     })
      // );

        //  setTimeout(() => {
        //     console.log("oldRequest")
        // }, 1000);



         return throwError("Access token")
       }

   }



}


export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
