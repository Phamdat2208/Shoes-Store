import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthService } from './BasicAuth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {
  private basicAuthService = inject(BasicAuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let username = this.basicAuthService.getAuthUsername();
    let basicAuthHeaderString = this.basicAuthService.getAuthToken();

    if (basicAuthHeaderString && username) {
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      })
    }

    return next.handle(req);
  };
}
