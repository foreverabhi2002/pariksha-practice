import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');
    // const client = sessionStorage.getItem('client');

    const headers: Record<string, any> = {};

    if (accessToken) {
      headers['Authorization'] = 'Bearer ' + accessToken;
    }

    // if (client) {
    //   // headers["X-CLIENT-ID"] = JSON.parse(client)._id;
    //   headers['X-CLIENT-ID'] = 'admin';
    // }

    const authReq = req.clone({ setHeaders: headers });
    return next.handle(authReq);
  }
}
