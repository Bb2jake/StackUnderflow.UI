import { QuestionDetailsComponent } from './question-details/question-details.component';
import { LoginComponent } from './login/login.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { Routes, CanActivate, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
	{ path: '', component: QuestionListComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'questions', component: QuestionListComponent },
	{ path: 'questions/:questionId', component: QuestionDetailsComponent },
	{ path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
