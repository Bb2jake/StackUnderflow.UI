import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor() { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log('intercepting request');
		request = request.clone({
			withCredentials: true,
		});
		return next.handle(request);
	}

}
