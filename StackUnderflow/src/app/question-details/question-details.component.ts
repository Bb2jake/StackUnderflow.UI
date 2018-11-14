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
	public questionId: number;

	constructor(private questionService: QuestionService, private activatedRoute: ActivatedRoute) {
		this.questionService.questionDetailDto.pipe(takeWhile(() => this.subscribe)).subscribe(questionDetailDto => {
			this.questionDetailDto = questionDetailDto;
		});
	}

	ngOnInit() {
		this.activatedRoute.paramMap.pipe(
			map((params) => {
				// (+) before `params.get()` turns the string into a number
				this.questionId = +params.get('questionId');
				this.questionService.getQuestionDetailDto(this.questionId);
				console.log(this.questionId);
			})
		).subscribe();
	}

}
