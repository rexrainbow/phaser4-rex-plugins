import { IQuest, IConfig } from './IQuest';
import {
    IQuestionManager,
    IConfig as IQuestionManagerConfig,
    QuestionType, OptionType
} from '../questions/IQuestionManager';
import { QuestionManager } from '../questions/QuestionManager';
import { BaseEventEmitter } from '../../../utils/eventemitter/BaseEventEmitter';
import { IsPlainObject } from '../../../utils/object/IsPlainObject';
import { Shuffle } from '../../../utils/array/Shuffle';
import { QuestEvent } from './events'

export class Quest extends BaseEventEmitter implements IQuest {
    questionsManager: IQuestionManager;
    shuffleQuestionsEnable: boolean;
    shuffleOptionsEnable: boolean;
    questionKeys: string[] = [];
    nextIndex: number;
    nextKey: string;

    constructor(
        questionsManager: IQuestionManager | IQuestionManagerConfig,
        {
            eventEmitter,
            shuffleQuestions = false,
            shuffleOptions = false
        }: IConfig = {}
    ) {

        super();

        // Event emitter
        this.setEventEmitter(eventEmitter);

        if (IsPlainObject(questionsManager)) {
            questionsManager = new QuestionManager(questionsManager as IQuestionManagerConfig);
        }
        this.questionsManager = questionsManager as IQuestionManager;
        this.setShuffleQuestionsEnable(shuffleQuestions);
        this.setShuffleOptionsEnable(shuffleOptions);
        this.init();
    }

    setShuffleQuestionsEnable(
        enabled: boolean = true
    ): this {

        this.shuffleQuestionsEnable = enabled;
        return this;
    }

    setShuffleOptionsEnable(
        enabled: boolean = true
    ): this {

        this.shuffleOptionsEnable = enabled;
        return this;
    }

    init(): this {
        // Reload keys
        this.questionKeys.length = 0;
        this.questionsManager.getKeys(this.questionKeys);
        if (this.shuffleQuestionsEnable) {
            Shuffle(this.questionKeys);
        }

        this.nextIndex = -1;
        this.nextKey = undefined;
        return this;
    }

    setNextKey(
        key?: string
    ): this {

        if (key === undefined) {
            this.nextIndex++;
            this.nextKey = this.questionKeys[this.nextIndex];
        } else if (this.questionsManager.has(key)) {
            this.nextKey = key;
            this.nextIndex = this.questionKeys.indexOf(key);
        } else {
            // Error
        }
        return this;
    }

    setPrevKey(): this {

        this.nextIndex--;
        this.nextKey = this.questionKeys[this.nextIndex];
        return this;
    }

    getQuestion(): QuestionType {

        const question = this.questionsManager.get(this.nextKey);
        if (question && this.shuffleOptionsEnable) {
            const options = question.options;
            if (options) {
                Shuffle(options);
            }
        }
        return question;
    }

    getNextQuestion(
        key?: string
    ): QuestionType {

        return this.setNextKey(key).getQuestion();
    }

    getPrevQuestion(): QuestionType {

        return this.setPrevKey().getQuestion();
    }

    getOption(
        question: QuestionType | string,
        optionKey?: string
    ): OptionType {

        if (optionKey === undefined) {
            optionKey = question as string;
            question = this.getQuestion();
        }
        return this.questionsManager.getOption(question, optionKey);
    }

    next(key?: string): this {

        const question = this.getNextQuestion(key);
        if (question) {
            this.emit(QuestEvent, question, this, this.questionsManager);
        }
        return this;
    }

    prev(): this {

        const question = this.getPrevQuestion();
        if (question) {
            this.emit(QuestEvent, question, this, this.questionsManager);
        }
        return this;
    }

    restart(key?: string): this {

        this.init();
        this.next(key);
        return this;
    }

    get isLastQuestion(): boolean {

        return this.nextIndex === (this.questionKeys.length - 1);
    }
}