import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // constructor() {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(request);
  // }
   constructor(private auth: AuthService, private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !req.url.includes('/login')) {
          return this.handle401(req, next);
        }
        return throwError(() => err);
      })
    );
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler) {
    const refreshToken = this.auth.getRefreshToken();
    return this.http.post<any>('http://localhost:8080/api/auth/refresh-token', { refreshToken }).pipe(
      switchMap(res => {
        this.auth.setToken(res.token);
        const newReq = req.clone({
          setHeaders: { Authorization: `Bearer ${res.token}` }
        });
        return next.handle(newReq);
      }),
      catchError(() => {
        this.auth.logout();
        return throwError(() => 'Refresh Failed');
      })
    );
  }
}
