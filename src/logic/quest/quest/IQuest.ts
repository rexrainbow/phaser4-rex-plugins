import {
    IBaseEventEmitter,
    IConfig as IEventEmitterConfig
} from '../../../utils/eventemitter/IBaseEventEmitter';
import { IQuestionManager, QuestionType, OptionType } from '../questions/IQuestionManager'

export interface IConfig extends IEventEmitterConfig {
    shuffleQuestions?: boolean;
    shuffleOptions?: boolean;
}

export interface IQuest {
    questionsManager: IQuestionManager,
    shuffleQuestionsEnable: boolean;
    shuffleOptionsEnable: boolean;
    questionKeys: string[];
    isLastQuestion: boolean;

    setShuffleQuestionsEnable(enabled?: boolean): this;
    setShuffleOptionsEnable(enabled?: boolean): this

    start(): this;
    next(key?: string): this;
    prev(): this;

    getQuestion(): QuestionType;
    getNextQuestion(key?: string): QuestionType;
    getPrevQuestion(): QuestionType;
    getOption(
        question: QuestionType | string,
        optionKey?: string
    ): OptionType
}