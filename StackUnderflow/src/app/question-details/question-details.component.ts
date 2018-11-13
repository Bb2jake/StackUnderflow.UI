import { takeWhile } from 'rxjs/operators';
import { QuestionService } from './../../services/question.service';
import { QuestionDetailDto } from './../../models/question-detail-dto';
import { Component, OnInit, Input } from '@angular/core';


@Component({
	selector: 'app-question-details',
	templateUrl: './question-details.component.html',
	styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
	public questionDetailDto: QuestionDetailDto;
	public subscribe = true;

	@Input() questionId: number;

	constructor(private questionService: QuestionService) {
		this.questionService.questionDetailDto.pipe(takeWhile(() => this.subscribe)).subscribe(questionDetailDto => {
			this.questionDetailDto = questionDetailDto;
		});
	}

	ngOnInit() {
		this.questionService.getQuestionDetailDto(this.questionId);
	}

}
