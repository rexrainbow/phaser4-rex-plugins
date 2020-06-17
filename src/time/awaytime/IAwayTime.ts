export enum State {
    IDLE, UPDATING
};

/**
 * Config of constructor.
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

export interface IState {
    key?: string;
    period?: number;

}

export interface IAwayTime {
    state: State;
    key: string;
    period: number;
    timer: number;

    awayTime: number;
}