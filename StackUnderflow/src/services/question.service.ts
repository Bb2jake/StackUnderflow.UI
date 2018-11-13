import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/models/question';

@Injectable()
export class QuestionService {
	constructor(private http: HttpClient) { }

	public questions = new Subject<Question[]>();

	getAllQuestions(): void {
		this.http.get<Question[]>(env.apiUrl + 'questions').subscribe(questions => {
			this.questions.next(questions);
		}, err => {
			console.error(err);
		});
	}
}
