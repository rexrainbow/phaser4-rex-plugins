import {
    IQuestionManager, IConfig, ICSVConfig,
    QuestionType, OptionType
} from './IQuestionManager';
import { AddQuestions } from './AddQuestions';

export class QuestionManager implements IQuestionManager {
    questions: Map<string, QuestionType> = new Map();

    constructor({
        questions
    }: IConfig = {}) {

        if (questions) {
            AddQuestions(this, questions, arguments[0]);
        }
    }

    add(
        questions: QuestionType | QuestionType[] | string,
        config?: ICSVConfig
    ): this {

        AddQuestions(this, questions, config);
        return this;
    }

    remove(
        key: string
    ): this {

        this.questions.delete(key);
        return this;
    }

    removeAll(): this {

        this.questions.clear();
        return this;
    }

    has(key: string): boolean {

        return this.questions.has(key);
    }

    get(key: string): QuestionType {

        return this.questions.get(key);
    }

    getKeys(out: string[] = []): string[] {

        const iterKeys = this.questions.keys();
        for (const key of iterKeys) {
            out.push(key);
        }
        return out;
    }

    getOption(
        question: QuestionType | string,
        optionKey: string
    ): OptionType {

        if (typeof (question) === 'string') {
            question = this.get(question);
        }
        if (!question) {
            return null;
        }
        const options = question.options;
        if (options) {
            for (let i = 0, cnt = options.length; i < cnt; i++) {
                let option = options[i];
                if (option.key === optionKey) {
                    return option;
                }
            }
        }
        return null;
    }
}