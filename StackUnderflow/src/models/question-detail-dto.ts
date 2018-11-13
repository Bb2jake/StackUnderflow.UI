import { Question } from './question';
import { Answer } from './answer';

export class QuestionDetailDto {
    public question: Question;
    public answerDtos: AnswerDto[];
}

export class AnswerDto {
    public answer: Answer;
    public comments: Comment[];
}
