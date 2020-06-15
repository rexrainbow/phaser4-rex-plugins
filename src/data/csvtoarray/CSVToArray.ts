import { IConfig } from './IConfig';
import CSVParser from 'papaparse/papaparse.min.js';

/**
 * Conver csv-format string to an 2d array.
 *
 * @param {string} csvString Csv-format string
 * @param {IConfig} [config] Configuration.
 * @returns {[any[]]} An 2d array.
 */
export function CSVToArray(
    csvString: string,
    config?: IConfig
): [any[]] {
    if (config === undefined) {
        config = {};
    }

    let delimiter: string,
        convert: boolean;
    ({ delimiter = ',', convert = true } = config);

    let arr = CSVParser.parse(csvString, {
        delimiter: delimiter,
        dynamicTyping: convert
    }).data;
    return arr;
};