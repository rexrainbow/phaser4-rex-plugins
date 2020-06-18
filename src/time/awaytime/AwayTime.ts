import { IAwayTime, IConfig, IState, State } from './IAwayTime';
/**
 * Get time from previous closing application to now. 
 *
 * @class AwayTime
 */
export class AwayTime implements IAwayTime {

    state: State;
    key: string;
    period: number;
    timer: number;

    /**
     * Creates an instance of AwayTime.
     * @param {IConfig} [config={}]
     * @memberof AwayTime
     */
    constructor(config: IConfig = {}) {

        let {
            key='away',
            period=1000
        } = config;

        this.state = State.IDLE;
        this.setKey(key);
        this.setPeriod(period);
    }

    /**
     * Destroy this instance.
     *
     * @memberof AwayTime
     */
    destroy(): void {
        this.stop();
    }

    /**
     * Reset state.
     *
     * @param {IState} [config]
     * @returns {this}
     * @memberof AwayTime
     */
    fromJSON({
        key = 'away',
        period = 1000
    }: IState): this {

        this.state = State.IDLE;
        this.setKey(key);
        this.setPeriod(period);
        return this;
    }

    /**
     * Get state.
     *
     * @returns {IState}
     * @memberof AwayTime
     */
    toJSON(): IState {
        return {
            key: this.key,
            period: this.period
        }
    }

    /**
     * Get time from previous closing application to now, in millisecond.
     *
     * @readonly
     * @type {number}
     * @memberof AwayTime
     */
    get awayTime(): number {
        let prevTimeData: string | null = localStorage.getItem(this.key);
        this.start();
        if (prevTimeData == null) {
            return 0;
        }

        let prevTime: number = parseInt(prevTimeData);
        let curTime: number = this.curTime;
        if ((prevTime < 0) || (prevTime > curTime)) {
            return 0;
        }

        // console.log(new Date(prevTime).toLocaleString());
        // console.log(new Date(curTime).toLocaleString());        
        return curTime - prevTime;
    }

    /**
     * Get current time-stamp.
     *
     * @readonly
     * @type {number}
     * @memberof AwayTime
     */
    get curTime(): number {
        return new Date().getTime();
    }

    /**
     * Start task of stroing current time-stamp periodically.
     *
     * @returns {this}
     * @memberof AwayTime
     */
    start(): this {

        this.stop();
        this.updateTime();
        this.timer = window.setInterval(this.updateTime.bind(this), this.period);
        this.state = State.UPDATING;
        return this;
    }

    /**
     * Stop task of stroing current time-stamp periodically.
     *
     * @returns {this}
     * @memberof AwayTime
     */
    stop(): this {
        if (this.state === State.IDLE) {
            return this;
        }

        clearTimeout(this.timer);
        this.timer = undefined;
        this.state = State.IDLE;
        return this;
    }

    /**
     * Stroing current time-stamp
     *
     * @returns {this}
     * @memberof AwayTime
     */
    updateTime(): this {

        localStorage.setItem(this.key, this.curTime.toString());
        return this;
    }

    /**
     * Set key of localStorage to store last time-stamp.
     *
     * @param {string} key Key of localStorage to store last time-stamp.
     * @returns {this}
     * @memberof AwayTime
     */
    setKey(key: string): this {

        this.key = key;
        return this;
    }

    /**
     * Set period of saving last time-stamp.
     *
     * @param {number} time Period of saving last time-stamp.
     * @returns {this}
     * @memberof AwayTime
     */
    setPeriod(time: number): this {

        this.period = time;
        return this;
    }
}