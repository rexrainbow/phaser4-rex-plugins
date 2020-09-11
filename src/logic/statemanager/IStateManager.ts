export interface IState {
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
    addState(
        name: string,
        state: IState
    ): this;
    addStates(
        states: { [stateName: string]: IState }
    ): this;

    start(state: string): this;
    goto(nextState?: string): this;
    next(): this;

    update(
        delta: number,
        time: number,
        type?: 'update' | 'preupdate' | 'postupdate'
    ): void;
    preupdate(
        delta: number,
        time: number
    ): void;
    postupdate(
        delta: number,
        time: number
    ): void;

}