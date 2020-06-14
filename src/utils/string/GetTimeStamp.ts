/**
 * Get current time-stamp in string format.
 *
 * @returns {string} Current time-stamp in string format.
 */
let GetTimeStamp = function (): string {
    return (new Date()).getTime().toString();
}

export default GetTimeStamp;