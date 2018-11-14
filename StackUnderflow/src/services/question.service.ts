import { QuestionDetailDto } from './../models/question-detail-dto';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/models/question';

@Injectable()
export class QuestionService {
	constructor(private http: HttpClient) {}
	private apiUrl = env.apiUrl + 'questions/';
	public questions = new Subject<Question[]>();
	public questionDetailDto = new Subject<QuestionDetailDto>();

	getAllQuestions(): void {
		this.http.get<Question[]>(this.apiUrl).subscribe(
			questions => {
				this.questions.next(questions);
			},
			err => {
				console.error(err);
			}
		);
	}

	getQuestionDetailDto(questionId: number): void {
		this.http
			.get<QuestionDetailDto>(this.apiUrl + questionId)
			.subscribe(questionDetailDto => {
				this.questionDetailDto.next(questionDetailDto);
			});
	}
	createQuestion(body: string): void {
		const question: Question = {
			body: body
		};
		this.http.post(this.apiUrl, question).subscribe(
			() => {
				this.getAllQuestions();
			},
			err => {
				console.error(err);
			}
		);
	}
}
