import { Answer } from './../models/answer';
import { QuestionService } from './question.service';
import { Injectable } from '@angular/core';
import { env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AnswerService {
	private apiUrl = env.apiUrl + 'answers/';

	constructor(private http: HttpClient, private questionService: QuestionService) {	}

	createAnswer(body: string): void {
		const answer: Answer = {
			body: body,
			questionId: this.questionService.activeQuestionId
		};

		this.http.post(this.apiUrl, answer).subscribe(
			() => {
				this.questionService.getQuestionDetailDto();
			},
			err => {
				console.error(err);
			}
		);
	}

	voteOnAnswer(answerId: number, upvote: boolean): any {
		// http put for answer
		this.http.post(`$${this.apiUrl}${answerId}`, upvote).subscribe(
			() => {
				this.questionService.getQuestionDetailDto();
			},
			err => {
				console.error(err);
			}
		);
	}
}
