import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	public userName: string;
	private subscribe = true;
	constructor(public authService: AuthService, private router: Router) {
		authService.userName.pipe(takeWhile(() => this.subscribe)).subscribe(userName => { this.userName = userName; });
	}

	ngOnInit(): void {
		this.authService.authenticate();
	}

	logout(): void {
		this.authService.logout().subscribe(() => {
			this.router.navigate(['/login']);
		});
	}
}
