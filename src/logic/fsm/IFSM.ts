import { IBaseEventEmitter } from '../../utils/eventemitter/IBaseEventEmitter';


export type StateDefineType = {
    next?: string | (() => string),
    enter?: (() => void),
    exit?: (() => void)
}

export type StatesDefineType = {
    [stateName: string]: StateDefineType
};

export interface IConfig {
    eventEmitter?: boolean;
}

export interface IFSM extends IBaseEventEmitter {

    destroy():void;
    setEnable(enable?: boolean): this;
    start(state: string): this;
    goto(nextState?: string): this;
    next(): this;

    update(time: number, delta: number, key?: string): void;
    preupdate(time: number, delta: number): void;
    postupdate(time: number, delta: number): void;

    addState(
        name: string,
        state: StateDefineType
    ): this;
    addStates(
        states: StatesDefineType
    ): this;
}