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
    return next.handle(request)

    //Check for any errors on the request
    .pipe(

      // Check if the request status code
      catchError((error: HttpErrorResponse) => {


        let url = request.url;

        // Check the error is unauthorised
        if (error.status === 401) {

            // If the error is coming from the refresh token api
            if (url === this.baseUrl+"accounts/auth/token/refresh/"){
              // Set the access token to an empty string in NGRX
              let access_token = ""
              this.store.dispatch(saveAccessToken({ access_token }));
              return throwError("No authentication token")
            }

            // If there is no access token, return the request
            if (!this.accessToken) {
              return throwError("No authentication token")


            } else {
              //If there is an access token and its expired, Get a new access token and retry the main request
              this.AuthService.getNewAccessToken().subscribe((response: any)=>{
                console.log("yoo")
                return next.handle(request)
              })
            }

        }

        // Pass the error to the calling code (components/services) so they can handle it further.
        return throwError(error);
      })
    );
  }
}


export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
