import { AuthGuardService } from './../services/auth-guard.service';
import { AuthService } from 'src/services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { routing } from './app.routes';
import { QuestionService } from 'src/services/question.service';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		QuestionListComponent
	],
	imports: [
		BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule, routing
	],
	providers: [AuthService, AuthGuardService, QuestionService],
	bootstrap: [AppComponent]
})
export class AppModule { }
