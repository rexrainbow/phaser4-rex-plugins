import { IConfig } from './ICSVToArray';
import { CSVParser } from '../../utils/string/papaparse';

/**
 * Conver csv-format string to an 2d array.
 *
 * @export
 * @param {string} csvString
 * @param {IConfig} [config={}]
 * @returns {any[]}
 */
export function CSVToArray(
    csvString: string,
    config: IConfig = {}
): any[] {

    let delimiter: string,
        convert: boolean;
    ({
        delimiter = ',',
        convert = true
    } = config);

    let arr: any[] = CSVParser.parse(csvString, {
        delimiter: delimiter,
        dynamicTyping: convert
    }).data;
    return arr;
};