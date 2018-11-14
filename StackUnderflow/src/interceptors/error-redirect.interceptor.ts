import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	public initialLoad = true;
	constructor(private router: Router
	) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).subscribe((event: HttpEvent<any>) => {
		}, (err: any) => {
			if (err instanceof HttpErrorResponse) {
				if (err.status === 401) {
					this.router.navigate(['login']);
				}
			}
		});
	}
}
