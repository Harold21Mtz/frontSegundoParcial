import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenExpirationInterceptor implements HttpInterceptor {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      return next.handle(request).pipe(
        catchError((error) => {
          if (error.status === 401) {
            localStorage.clear();
            this.router.navigateByUrl('/auth');
          }
          throw error;
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
