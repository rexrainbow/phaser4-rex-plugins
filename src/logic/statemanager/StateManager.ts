import { BaseEventEmitter } from '../../utils/eventemitter/BaseEventEmitter';
import {
    IStateManager,
    IConfig,
    IState
} from './IStateManager';
import { StateChangeEvent, ExitStateEvent, EnterStateEvent } from './events';

export class StateManager extends BaseEventEmitter implements IStateManager {
    states: Map<string, IState>;
    _stateLock: boolean;
    enable: boolean = true;
    _start: string;
    _state: string;
    _prevState: string;

    constructor({
        eventEmitter
    }: IConfig = {}) {

        super();

        // Event emitter
        this.setEventEmitter(eventEmitter);
        this.states = new Map();
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

    getState(
        name: string
    ): IState {
        return this.states.get(name);
    }

    addState(
        name: string,
        state: IState
    ): this {

        this.states.set(name, state);
        return this;
    }

    addStates(
        states: { [stateName: string]: IState }
    ): this {

        for (const name in states) {
            this.addState(name, states[name]);
        }
        return this;
    }

    set state(newState: string) {

        if (!this.enable || this._stateLock) {
            return;
        }
        if (this._state === newState) {
            return;
        }

        this._prevState = this._state;
        this._state = newState;

        this._stateLock = true; // Lock state

        this.emit(StateChangeEvent, this);

        if (this._prevState != null) {
            const state = this.getState(this._prevState);
            if (state && state.exit) {
                state.exit(this);
            }
            this.emit(ExitStateEvent(this._prevState), this);
        }

        this._stateLock = false;

        if (this._state != null) {
            const state = this.getState(this._state);
            if (state && state.enter) {
                state.enter(this);
            }
            this.emit(EnterStateEvent(this._state), this);
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

        const state = this.getState(this.state);
        if (!state || !state.next) {
            return this;
        }

        let nextState: string;
        if (typeof (state.next) === 'string') {
            nextState = state.next;
        } else {
            nextState = state.next(this);
        }
        this.goto(nextState);
        return this;
    }

    update(
        time: number,
        delta: number,
        type: 'update' | 'preupdate' | 'postupdate' = 'update'
    ): void {

        const state = this.getState(this.state);
        if (state && state[type]) {
            state[type](this, time, delta);
        }
    }

    preupdate(
        delta: number,
        time: number
    ): void {

        this.update(time, delta, 'preupdate');
    }

    postupdate(
        delta: number,
        time: number
    ): void {

        this.update(time, delta, 'postupdate');
    }

}