import { Question } from './question';
import { Answer } from './answer';
import { Comment } from './comment';

export class QuestionDetailDto {
	public question: Question;
	public answerDtos: AnswerDto[];
}

export class AnswerDto {
	public answer: Answer;
	public comments: Comment[];
	public votes: number;
}
