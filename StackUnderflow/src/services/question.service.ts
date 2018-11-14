import { QuestionDetailDto } from './../models/question-detail-dto';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/models/question';

@Injectable()
export class QuestionService {
	constructor(private http: HttpClient) { }
	private apiUrl = env.apiUrl + 'questions/';
	public questions = new Subject<Question[]>();
	public questionDetailDto = new Subject<QuestionDetailDto>();
	public activeQuestionId: number;

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

	getQuestionDetailDto(): void {
		this.http
			.get<QuestionDetailDto>(this.apiUrl + this.activeQuestionId)
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

	acceptAnswer(question: Question): any {
		// http put for question. Comes in with the accepted answer value updated.
		this.http.put(`${this.apiUrl}${question.id}`, question).subscribe(
			() => {
				// refresh the questionDetailDto
				this.getQuestionDetailDto();
			},
			err => {
				console.error(err);
			}
		);
	}

	voteOnQuestion(questionId: number, upvote: boolean): any {
		this.http.post(`$${this.apiUrl}${questionId}`, upvote).subscribe(
			() => {
				this.getAllQuestions();
				this.getQuestionDetailDto();
			},
			err => {
				console.error(err);
			}
		);
	}

}
