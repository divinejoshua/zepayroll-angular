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
    .pipe(

      // Check if the request status code
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error here
          // For example, you might redirect to the login page or perform a logout action.
          console.log('Unauthorized: Redirect to login page or perform logout.');
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
