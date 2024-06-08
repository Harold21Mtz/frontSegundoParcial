import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../public/loader.service';
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.setActive();

    let clonedRequest = request;

    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      const dialog = inject(MatDialog);
      if (typeof window !== 'undefined' && token != null) {
        clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }else{
        dialog.closeAll();
      }
    }


    return next.handle(clonedRequest).pipe(
      finalize(() => {
        this.loader.setInactive();
      })
    );
  }
}
