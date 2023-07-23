import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
import { environment } from 'src/environments/environment';
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


  constructor(public store: Store<AppState>, private AuthService:AuthService, private http:HttpClient,){

    // Get the access token from store
    this.store.select(selectAllAccessToken).subscribe((access_token: string) => {
      this.accessToken = access_token
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Set with credentials for all requests
    request = request.clone({
      withCredentials: true
    })

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

         //Call the refresh token api
        const bodyParams = {
        // 'refresh': localStorage.getItem('refresh_token')
        }
        return this.http.post(this.baseUrl+"accounts/auth/token/refresh/", bodyParams)
        .pipe(
          switchMap((response: any) => {

            // Store the new access token
            let access_token = response.access
            this.store.dispatch(saveAccessToken({ access_token }));
            this.accessToken = access_token

            // Get logged in user details
            this.AuthService.getLogggedInUser()

            // Resend the previous request
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${access_token}`
              }
            }));
          })
        );

       }

   }



}


export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
