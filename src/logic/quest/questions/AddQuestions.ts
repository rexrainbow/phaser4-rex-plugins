import { IQuestionManager, QuestionType, ICSVConfig } from './IQuestionManager';
import { CSVToQuestions } from './CSVToQuestions';

export function AddQuestions(
    questionManager: IQuestionManager,
    questions: QuestionType | QuestionType[] | string,
    config?: ICSVConfig
) {
    if (typeof (questions) === 'string') {
        questions = CSVToQuestions(questions, config);
    }

    if (Array.isArray(questions)) {
        for (let i = 0, cnt = questions.length; i < cnt; i++) {
            AddQuestion(questionManager, questions[i]);
        }
    } else {
        AddQuestion(questionManager, questions);
    }

}

function AddQuestion(
    questionManager: IQuestionManager,
    question: QuestionType
) {

    const options = question.options;
    if (options) {
        // Apply key via serial number
        for (let i = 0, cnt = options.length; i < cnt; i++) {
            let option = options[i];
            if (!option.hasOwnProperty('key')) {
                option.key = `_${i}`;
            }
        }
    }
    if (!question.hasOwnProperty('key')) {
        // Apply key via serial numbers
        question.key = `_${questionManager.questions.size}`;
    }
    questionManager.questions.set(question.key, question);

}