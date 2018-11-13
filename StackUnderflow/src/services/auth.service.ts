import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
	constructor(private http: HttpClient) { }

	isAuthenticated(): any {
		return true;
	}

	login(username: string, password: string): Observable<boolean> {
		return this.http.post(env.apiUrl + 'login', { username, password }).pipe(
			map(() => {
				return true;
			}),
			catchError(() => of(false))
		);
	}

	logout(): Observable<boolean> {
		return this.http.delete(env.apiUrl + 'logout').pipe(
			map(() => {
				return true;
			}),
			catchError(() => of(false))
		);
	}
}
