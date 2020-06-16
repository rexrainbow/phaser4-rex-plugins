var State;
(function (State) {
    State[State["IDLE"] = 0] = "IDLE";
    State[State["UPDATING"] = 1] = "UPDATING";
})(State || (State = {}));

class AwayTime {
    constructor(config) {
        this.resetFromJSON(config);
    }
    destroy() {
        this.stop();
    }
    resetFromJSON(config) {
        let key, period;
        ({
            key = 'away',
            period = 1000
        } = config || {});
        this.state = State.IDLE;
        this.setKey(key);
        this.setPeriod(period);
        return this;
    }
    toJSON() {
        return {
            key: this.key,
            period: this.period
        };
    }
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
        return curTime - prevTime;
    }
    get curTime() {
        return new Date().getTime();
    }
    start() {
        this.stop();
        this.updateTime();
        this.timer = window.setInterval(this.updateTime.bind(this), this.period);
        this.state = State.UPDATING;
        return this;
    }
    stop() {
        if (this.state === State.IDLE) {
            return this;
        }
        clearTimeout(this.timer);
        this.timer = undefined;
        this.state = State.IDLE;
        return this;
    }
    updateTime() {
        localStorage.setItem(this.key, this.curTime.toString());
        return this;
    }
    setKey(key) {
        this.key = key;
        return this;
    }
    setPeriod(time) {
        this.period = time;
        return this;
    }
}

export { AwayTime };
