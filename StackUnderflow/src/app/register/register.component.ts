import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	submitted = false;
	returnUrl: string;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService
	) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});

		// reset register status
		this.authService.logout();

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}

		console.log('registering');

		this.authService.register(this.f.username.value, this.f.password.value)
			.pipe(first())
			.subscribe(
				() => {
					this.router.navigate(['login']);
				},
				error => {
					console.error(error);
				});
	}
}
