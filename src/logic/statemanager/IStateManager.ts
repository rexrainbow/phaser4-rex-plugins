export interface IState {
    name?: string;
    next?: ((stateManager: IStateManager) => string) | string;
    exit?: ((stateManager: IStateManager) => void);
    enter?: ((stateManager: IStateManager) => void);

    update?: (stateManager: IStateManager, delta: number, time: number) => void;
    preupdate?: (stateManager: IStateManager, delta: number, time: number) => void;
    postupdate?: (stateManager: IStateManager, delta: number, time: number) => void;
}

import {
    IBaseEventEmitter,
    IConfig as IEventEmitterConfig
} from '../../utils/eventemitter/IBaseEventEmitter';

export interface IConfig extends IEventEmitterConfig {
}

export interface IStateManager extends IBaseEventEmitter {

    destroy(): void;
    setEnable(enable?: boolean): this;

    getState(name: string): IState;

    addState(state: IState): this;
    addState(name: string, state: IState): this;

    addStates(states: IState[]): this;
    addStates(states: { [name: string]: IState }): this;

    removeState(name: string): this;
    removeAllStates(): this;

    start(state: string): this;
    goto(nextState?: string): this;
    next(): this;

    runMethod(methodName: string, ...args: unknown[]): unknown;
    update(delta: number, time: number): void;
    preupdate(delta: number, time: number): void;
    postupdate(delta: number, time: number): void;
}