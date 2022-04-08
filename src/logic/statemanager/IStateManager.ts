export type StateNameType = string | number;

export interface IState {
    name: StateNameType;
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

    getState(name: StateNameType): IState;
    addState(state: IState): this;
    addStates(states: IState[]): this;
    removeState(name: StateNameType): this;
    removeAllStates(): this;

    start(state: StateNameType): this;
    goto(nextState?: StateNameType): this;
    next(): this;

    runMethod(methodName: string, ...args: unknown[]): unknown;
    update(delta: number, time: number): void;
    preupdate(delta: number, time: number): void;
    postupdate(delta: number, time: number): void;
}