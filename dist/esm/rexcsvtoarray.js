import './_commonjsHelpers-ecffabcd.js';
import { p as papaparse_min } from './papaparse.min-494779ee.js';

function CSVToArray(csvString, config) {
    let delimiter, convert;
    ({
        delimiter = ',',
        convert = true
    } = config || {});
    let arr = papaparse_min.parse(csvString, {
        delimiter: delimiter,
        dynamicTyping: convert
    }).data;
    return arr;
}

export { CSVToArray };
