import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { SpinnerService } from '../../core.index';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinner: SpinnerService) {}
  token: any;
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.token = localStorage.getItem('AccessToken');

    // request.clone({
    //   setHeaders: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     Authorization: `${this.token}`,
    //   },
    // });
    if (this.token) {
      // If we have a token, we set it to the header
      request = request.clone({
         setHeaders: {Authorization: `Authorization token ${this.token}`}
      });
   }    
    this.spinner.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.spinner.hide();
      }),
      catchError((error) => {
        if (error) {
          this.spinner.hide();
        }
        return throwError(error);
      })
    );
  }
}
