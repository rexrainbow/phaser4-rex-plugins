import { IConfig } from './ICSVToArray';
import { CSVParser } from '../../utils/string/papaparse';

/**
 * onver csv-format string to an 2d array.
 *
 * @export
 * @param {string} csvString
 * @param {IConfig} [{
 *         delimiter = ',',
 *         convert = true
 *     }={}]
 * @returns {unknown[]}
 */
export let CSVToArray = function (
    csvString: string,
    {
        delimiter = ',',
        convert = true
    }: IConfig = {}
): unknown[] {

    let arr: unknown[] = CSVParser.parse(csvString, {
        delimiter: delimiter,
        dynamicTyping: convert
    }).data;
    return arr;
};