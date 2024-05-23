import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../public/loader.service';
import {BrowserStorageService} from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService, private _local: BrowserStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.setActive();

    let clonedRequest = request;
    const token = this._local.getItem('accessToken');
    if (typeof window !== 'undefined' && token) {
      clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(clonedRequest).pipe(
      finalize(() => {
        this.loader.setInactive();
      })
    );
  }
}
