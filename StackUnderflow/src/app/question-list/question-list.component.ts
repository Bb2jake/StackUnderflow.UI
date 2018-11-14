import { Router } from '@angular/router';
import { QuestionService } from './../../services/question.service';
import { Question } from 'src/models/question';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

@Component({
	selector: 'app-question-list',
	templateUrl: './question-list.component.html',
	styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {
	public questions: Question[];
	public subscribe = true;
	public newQuestionBod: string;
	constructor(
		private questionService: QuestionService,
		private router: Router
	) {
		this.questionService.questions
			.pipe(takeWhile(() => this.subscribe))
			.subscribe(questions => (this.questions = questions));
	}

	ngOnInit() {
		this.questionService.getAllQuestions();
	}

	ngOnDestroy() {
		this.subscribe = false;
	}

	goToDetailPage(questionId: number) {
		console.log('should be routing');
		this.router.navigate([`/questions/${questionId}`],  { queryParams: { questionId: questionId } });
	}

	createQuestion() {
		if (!this.newQuestionBod) {
			return;
		}
		this.questionService.createQuestion(this.newQuestionBod);
		this.newQuestionBod = '';
	}
}
