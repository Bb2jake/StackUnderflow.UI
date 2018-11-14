import { CommentService } from './../services/comment.service';
import { AnswerService } from './../services/answer.service';
import { AuthService } from 'src/services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { routing } from './app.routes';
import { QuestionService } from 'src/services/question.service';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { ErrorInterceptor } from 'src/interceptors/error-redirect.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		QuestionListComponent,
		QuestionDetailsComponent
	],
	imports: [
		BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule, routing
	],
	providers: [
		AuthService,
		QuestionService,
		AnswerService,
		CommentService,
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
