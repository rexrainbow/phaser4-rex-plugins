import {
    ICSVConfig, QuestionType, OptionType,
    TypeConvertHanderType
} from './IQuestionManager';
import CSVParser from 'papaparse/papaparse.min.js';
import { TypeConvert as DefaultConvertFn } from '../../../utils/string/TypeConvert';

type ItemType = { [name: string]: string | number | boolean | null };
type SrcItemType = { [name: string]: string };

export function CSVToQuestions(
    csvString: string,
    {
        delimiter = ',',
        convert = true,
        types = {}
    }: ICSVConfig = {}
): QuestionType[] {

    const arr: any[] = CSVParser.parse(csvString, {
        header: true,
        delimiter: delimiter,
    }).data;

    const questionType = types.question ?? 'q';
    const optionType = types.option ?? '';
    const convertFn = (convert === true) ? DefaultConvertFn : convert;

    const questions: QuestionType[] = [];
    let question: QuestionType,
        option: OptionType;
    for (let i = 0, cnt = arr.length; i < cnt; i++) {

        let rowObj: SrcItemType = arr[i];
        let rowType = rowObj.type;
        delete rowObj.type;

        if (rowType === questionType) {
            question = rowObj;
            if (question.key === '') {
                delete question.key;
            }

            Convert(question, convertFn);

            question.options = [];
            questions.push(question);
        } else if (rowType === optionType) {
            if (question) {
                option = rowObj;
                if (option.key === '') {
                    delete option.key;
                }

                Convert(option, convertFn);
                question.options.push(option);
            } else {
                // Error
            }
        }
    }

    return questions;
}

function Convert(
    item: SrcItemType,
    convertFn: TypeConvertHanderType | false
): ItemType {

    const result: ItemType = item;
    if (!convertFn) {
        return result;
    }

    for (const key in item) {
        result[key] = convertFn(item[key], key);
    }
    return result;
}