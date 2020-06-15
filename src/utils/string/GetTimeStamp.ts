/**
 * Get current time-stamp in string format.
 *
 * @returns {string} Current time-stamp in string format.
 */
export default function GetTimeStamp(): string {
    return (new Date()).getTime().toString();
}