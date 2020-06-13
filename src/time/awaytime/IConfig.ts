/**
 * Configuration of AwayTime class.
 *
 * @export
 * @interface IConfig
 */
export interface IConfig {
    /**
     * Key of localStorage to store last time-stamp.
     *
     * @type {string}
     * @memberof IConfig
     */
    key?: string;

    /**
     * Period of saving last time-stamp.
     *
     * @type {number}
     * @memberof IConfig
     */
    period?: number;

}