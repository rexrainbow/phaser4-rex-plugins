import { BaseEventEmitter } from '../../utils/eventemitter/BaseEventEmitter';
import {
    IStateManager,
    IConfig,
    IState, StateNameType
} from './IStateManager';
import { StateChangeEvent, ExitStateEvent, EnterStateEvent } from './events';

export class StateManager extends BaseEventEmitter implements IStateManager {
    _states: Map<StateNameType, IState> = new Map();
    _stateLock: boolean;
    enable: boolean = true;
    _start: StateNameType;
    _state: StateNameType;
    _prevState: StateNameType;

    constructor({
        eventEmitter
    }: IConfig = {}) {

        super();

        // Event emitter
        this.setEventEmitter(eventEmitter);
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

    getState(name: StateNameType): IState {

        return this._states.get(name);
    }

    addState(state: IState): this {

        this._states.set(state.name, state);
        return this;
    }

    addStates(states: IState[]): this {

        for (let i = 0, cnt = states.length; i < cnt; i++) {
            this.addState(states[i]);
        }
        return this;
    }

    removeState(
        name: StateNameType
    ): this {

        this._states.delete(name);
        return this;
    }

    removeAllStates(): this {

        this._states.clear();
        return this;
    }

    set state(newState: StateNameType) {

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

    get state(): StateNameType {
        return this._state;
    }

    get prevState(): StateNameType {
        return this._prevState;
    }

    get stateList(): StateNameType[] {

        return Array.from(this._states.keys());
    }

    start(
        state: StateNameType
    ): this {

        this._start = state;
        this._prevState = undefined;
        this._state = state; // Won't fire statechange events
        return this;
    }

    goto(
        nextState?: StateNameType
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

    runMethod(
        methodName: string,
        ...args: unknown[]
    ): unknown {

        const state = this.getState(this.state);
        if (!state) {
            return undefined;
        }

        const fn = state[methodName];
        if (!fn) {
            return undefined;
        }

        return fn(this, ...args);
    }

    update(
        time: number,
        delta: number
    ): void {

        this.runMethod('update', time, delta);
    }

    preupdate(
        delta: number,
        time: number
    ): void {

        this.runMethod('preupdate', time, delta);
    }

    postupdate(
        delta: number,
        time: number
    ): void {

        this.runMethod('postupdate', time, delta);
    }

}