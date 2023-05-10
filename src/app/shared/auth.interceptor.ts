import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {AuthServices} from "../admin/shared/services/auth.services";
import { Router } from "@angular/router";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthServices,
    private router: Router
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.authService.token ? this.authService.token : ''
        }
      })
    }
    return next.handle(req)
      .pipe(
        tap(() => {
          console.log('Interceptor called')
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('[Interceptor Error]: ' + error);
          if(error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/admin', 'login'], {
              queryParams: {
                authFaild: true
              }
            });
          }
          return throwError(error)
        })
      )

  }

}
