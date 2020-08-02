export type OptionType = {
    key?: string,
    [name: string]: any
}

export type QuestionType = {
    key?: string,
    options?: OptionType[],
    [name: string]: any
}

export type TypeConvertHanderType = (s: string, key?: string) => string | number | boolean | null;

export interface ICSVConfig {
    delimiter?: string,
    types?: {
        question?: string,
        option?: string
    }
    convert?: boolean | TypeConvertHanderType,
}

export interface IConfig extends ICSVConfig {
    questions?: QuestionType[] | string;
}

export interface IQuestionManager {
    questions: Map<string, QuestionType>;

    getKeys(out?: string[]): string[];

    has(key: string): boolean;

    get(key: string): QuestionType;

    getOption(
        question: QuestionType | string,
        optionKey: string
    ): OptionType;

}