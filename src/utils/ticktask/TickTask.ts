import { BaseEventEmitter } from '../eventemitter/BaseEventEmitter';
import { IConfig, TickingMode, TickingModeString } from './ITickTask';
import { CompleteEvent } from './events';

export abstract class TickTask extends BaseEventEmitter {
    parent: any;
    _isRunning: boolean = false;
    tickingState: boolean = false;
    tickingMode: TickingMode;

    constructor(parent: any, {
        eventEmitter,
        tickingMode = TickingMode.lazy
    }: IConfig = {}) {

        super();

        this.parent = parent;
        // Event emitter
        this.setEventEmitter(eventEmitter);
        this.setTickingMode(tickingMode);
    }

    // Override
    boot() {
        if ((this.tickingMode === TickingMode.always) && (!this.tickingState)) {
            this.startTicking();
        }
    }

    // Override
    shutdown() {
        this.destroyEventEmitter();
        if (this.tickingState) {
            this.stopTicking();
        }
    }

    setTickingMode(mode: TickingMode | TickingModeString) {

        if (typeof (mode) === 'string') {
            mode = TickingMode[mode];
        }
        this.tickingMode = mode;
    }

    // Override
    startTicking() {
        this.tickingState = true;
    }

    // Override
    stopTicking() {
        this.tickingState = false;
    }

    get isRunning(): boolean {
        return this._isRunning;
    }

    set isRunning(value) {

        if (this._isRunning === value) {
            return;
        }

        this._isRunning = value;
        if ((this.tickingMode === TickingMode.lazy) && (value != this.tickingState)) {
            if (value) {
                this.startTicking();
            } else {
                this.stopTicking();
            }
        }
    }

    start(): this {

        this.isRunning = true;
        return this;
    }

    pause(): this {

        this.isRunning = false;
        return this;
    }

    resume(): this {

        this.isRunning = true;
        return this;
    }

    stop(): this {

        this.isRunning = false;
        return this;
    }

    complete() {

        this.isRunning = false;
        this.emit(CompleteEvent, this.parent, this);
    }
}