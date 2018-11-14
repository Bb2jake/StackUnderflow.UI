import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
	constructor(private http: HttpClient) { }
	private apiUrl = 'http://localhost:5000/';
	public userName = new BehaviorSubject<string>(null);

	authenticate() {
		this.http.get<{}>(`${this.apiUrl}authenticate`).subscribe(user => {
			this.userName.next(user['userName']);
		}, err => {
			console.error(err);
		});
	}

	login(username: string, password: string): Observable<boolean> {
		return this.http.post<{}>(`${this.apiUrl}login`, { username, password }).pipe(
			map(user => {
				this.userName.next(user['userName']);
				return true;
			}),
			catchError(() => of(false))
		);
	}

	register(username: string, password: string): Observable<boolean> {
		return this.http.post(`${this.apiUrl}register`, { username, password }).pipe(
			map(() => {
				return true;
			}),
			catchError(() => of(false))
		);
	}

	logout(): Observable<boolean> {
		return this.http.delete(`${this.apiUrl}logout`).pipe(
			map(() => {
				this.userName.next(null);
				return true;
			}),
			catchError(() => of(false))
		);
	}
}
