import { Comment } from '../models/comment';
import { QuestionService } from './question.service';
import { Injectable } from '@angular/core';
import { env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommentService {
	private apiUrl = env.apiUrl + 'comments/';

	constructor(private http: HttpClient, private questionService: QuestionService) {
	}

	createComment(answerId: number, body: string): void {
		const comment: Comment = {
			body: body,
			answerId: answerId
		};

		this.http.post(this.apiUrl, comment).subscribe(
			() => {
				this.questionService.getQuestionDetailDto();
			},
			err => {
				console.error(err);
			}
		);
	}
}
