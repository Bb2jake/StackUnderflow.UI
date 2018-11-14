import { CommentService } from './../../services/comment.service';
import { AnswerService } from './../../services/answer.service';
import { ActivatedRoute, Params } from '@angular/router';
import { takeWhile, switchMap, map } from 'rxjs/operators';
import { QuestionService } from './../../services/question.service';
import { QuestionDetailDto } from './../../models/question-detail-dto';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
	selector: 'app-question-details',
	templateUrl: './question-details.component.html',
	styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
	public questionDetailDto: QuestionDetailDto;
	public subscribe = true;

	constructor(private questionService: QuestionService, private answerService: AnswerService, private commentService: CommentService, private activatedRoute: ActivatedRoute) {
		this.questionService.questionDetailDto.pipe(takeWhile(() => this.subscribe)).subscribe(questionDetailDto => {
			this.questionDetailDto = questionDetailDto;
		});
	}

	ngOnInit() {
		this.activatedRoute.paramMap.pipe(
			map((params) => {
				this.questionService.activeQuestionId = +params.get('questionId');
				this.questionService.getQuestionDetailDto();
				// this.questionService.activeQuestionId = this.questionId;
			})
		).subscribe();
	}

	// create answer
	createAnswer(body: string) {
		this.answerService.createAnswer(body);
	}

	// accept answer
	acceptAnswer(answerId: number) {
		this.questionDetailDto.question.acceptedAnswerId = answerId;
		this.questionService.acceptAnswer(this.questionDetailDto.question);
	}

	// vote on answer
	voteOnAnswer(answerId: number, upvote: boolean) {
		this.answerService.voteOnAnswer(answerId, upvote);
	}

	createComment(answerId: number, body: string) {
		this.commentService.createComment(answerId, body);
	}
}
