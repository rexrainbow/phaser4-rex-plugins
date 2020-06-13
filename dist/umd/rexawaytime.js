(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.rexawaytime = {}));
}(this, (function (exports) { 'use strict';

    /**
     * Get time from previous closing application to now.
     *
     * @class AwayTime
     */
    class AwayTime {
        /**
         * Creates an instance of AwayTime.
         * @param {IConfig} [config]
         * @memberof AwayTime
         */
        constructor(config) {
            if (config === undefined) {
                config = {};
            }
            this.resetFromJSON(config);
        }
        /**
         * Destroy this instance.
         *
         * @memberof AwayTime
         */
        destroy() {
            this.stop();
        }
        /**
         * Reset configuration.
         *
         * @param {IConfig} {
         *         key = 'away',
         *         period = 1000
         *     }
         * @returns {this}
         * @memberof AwayTime
         */
        resetFromJSON({ key = 'away', period = 1000 }) {
            this.state = State.IDLE;
            this.setKey(key);
            this.setPeriod(period);
            return this;
        }
        /**
         * Get time from previous closing application to now, in millisecond.
         *
         * @readonly
         * @type {number}
         * @memberof AwayTime
         */
        get awayTime() {
            let prevTimeData = localStorage.getItem(this.key);
            this.start();
            if (prevTimeData == null) {
                return 0;
            }
            let prevTime = parseInt(prevTimeData);
            let curTime = this.curTime;
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
        get curTime() {
            return new Date().getTime();
        }
        /**
         * Start task of stroing current time-stamp periodically.
         *
         * @returns {this}
         * @memberof AwayTime
         */
        start() {
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
        stop() {
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
        updateTime() {
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
        setKey(key) {
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
        setPeriod(time) {
            this.period = time;
            return this;
        }
    }
    var State;
    (function (State) {
        State[State["IDLE"] = 0] = "IDLE";
        State[State["UPDATING"] = 1] = "UPDATING";
    })(State || (State = {}));

    exports.AwayTime = AwayTime;

})));
//# sourceMappingURL=rexawaytime.js.map
