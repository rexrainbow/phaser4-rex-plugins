/**
 * Convert color number to hex string.
 *
 * @param {*} value Color number
 * @returns {string} Color value in hex string.
 */
let NumberToColorString = function (value: any): string {
    if (typeof (value) === 'number') {
        value = `#${value.toString(16)}`;
    }
    return value;
}

export default NumberToColorString;