/**
 * Get current time-stamp in string format.
 *
 * @returns {string} Current time-stamp in string format.
 */
export let GetTimeStamp = function (): string {
    return (new Date()).getTime().toString();
}