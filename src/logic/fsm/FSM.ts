import { BaseEventEmitter } from '../../utils/eventemitter/BaseEventEmitter';
import {
    IFSM,
    IConfig,
    StateDefineType, StatesDefineType
} from './IFSM';


export class FSM extends BaseEventEmitter implements IFSM {
    _stateLock: boolean;
    enable: boolean = true;
    _start: string;
    _state: string;
    _prevState: string;

    constructor({
        eventEmitter = true
    }: IConfig = {}) {

        super();

        // Event emitter
        if (eventEmitter) {
            this.setEventEmitter();
        }
    }

    destroy() {
        this.destroyEventEmitter();
    }

    toJSON() {
        return {
            curState: this.state,
            prevState: this.prevState,

            enable: this.enable,
            start: this._start
        };
    }

    setEnable(enable: boolean = true) {

        this.enable = enable;
        return this;
    }

    set state(newState) {
        if (!this.enable || this._stateLock) {
            return;
        }
        if (this._state === newState) {
            return;
        }
        this._prevState = this._state;
        this._state = newState;

        this._stateLock = true; // lock state

        this.emit('statechange', this);

        if (this._prevState != null) {
            let exitEventName = `exit_${this._prevState}`;
            let exitCallback: (() => void) = this[exitEventName];
            if (exitCallback) {
                exitCallback.call(this);
            }
            this.emit(exitEventName, this);
        }

        this._stateLock = false;

        if (this._state != null) {
            let enterEventName = `enter_${this._state}`;
            let enterCallback: (() => void) = this[enterEventName];
            if (enterCallback) {
                enterCallback.call(this);
            }
            this.emit(enterEventName, this);
        }
    }

    get state(): string {
        return this._state;
    }

    get prevState(): string {
        return this._prevState;
    }

    start(
        state: string
    ): this {

        this._start = state;
        this._prevState = undefined;
        this._state = state; // Won't fire statechange events
        return this;
    }

    goto(
        nextState?: string
    ): this {

        if (nextState != null) {
            this.state = nextState;
        }
        return this;
    }

    next(): this {

        let nextState: string;
        let GetNextStateCallback: (() => void) | string = this['next_' + this.state];
        if (!GetNextStateCallback) {
            return this;
        }

        if (typeof (GetNextStateCallback) === 'string') {
            nextState = GetNextStateCallback;
        } else {
            nextState = GetNextStateCallback.call(this);
        }
        this.goto(nextState);
        return this;
    }

    update(
        time: number,
        delta: number,
        key: string = 'update'
    ): void {

        let fn: ((time: number, delta: number) => void) = this[`${key}_${this.state}`];
        if (fn) {
            fn.call(this, time, delta);
        }
    }

    preupdate(time: number, delta: number): void {

        this.update(time, delta, 'preupdate');
    }

    postupdate(time: number, delta: number): void {

        this.update(time, delta, 'postupdate');
    }

    addState(
        name: string,
        { next, exit, enter }: StateDefineType
    ): this {

        if (next) {
            this[`next_${name}`] = next;
        }

        if (exit) {
            this[`exit_${name}`] = exit;
        }

        if (enter) {
            this[`enter_${name}`] = enter;
        }
        return this;
    }

    addStates(
        states: StatesDefineType
    ): this {

        for (const name in states) {
            this.addState(name, states[name]);
        }
        return this;
    }

}