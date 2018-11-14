import { AuthService } from 'src/services/auth.service';
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
	public newAnswerBody: string;
	public subscribe = true;
	public username: string;

	constructor(private questionService: QuestionService, private answerService: AnswerService, private commentService: CommentService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
		this.questionService.questionDetailDto.pipe(takeWhile(() => this.subscribe)).subscribe(questionDetailDto => {
			this.questionDetailDto = questionDetailDto;
		});
		authService.userName.pipe(takeWhile(() => this.subscribe)).subscribe(username => {
			this.username = username;
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
	createAnswer() {
		this.answerService.createAnswer(this.newAnswerBody);
		this.newAnswerBody = '';
	}

	// accept answer
	acceptAnswer(answerId: number) {
		this.questionDetailDto.question.acceptedAnswerId = answerId;
		this.questionService.acceptAnswer(this.questionDetailDto.question);
	}

	voteOnQuestion(upvote: boolean) {
		this.questionService.voteOnQuestion(this.questionService.activeQuestionId, upvote);
	}

	// vote on answer
	voteOnAnswer(answerId: number, upvote: boolean) {
		this.answerService.voteOnAnswer(answerId, upvote);
	}

	createComment(answerId: number, index: number) {
		const input: any = document.getElementById('input' + index);
		const body = input.value;
		this.commentService.createComment(answerId, body);
	}
}
