let FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;

/**
 * Convert string to string, number, boolean value, or null(from empty string).
 *
 * @param {string} s Source string.
 * @returns {(string | number | boolean | null)} String, number, boolean value, or null(from empty string).
 */
export default function Convert(s: string): string | number | boolean | null {

    let result: string | number | boolean | null;
    if (s === '') {
        result = null;
    } else if (FLOAT.test(s)) {
        result = parseFloat(s);
    } else {
        if (s === 'false') {
            result = false;
        } else if (s === 'true') {
            result = true;
        } else {
            result = s;
        }
    }

    return result;
};