import {
    IBaseEventEmitter,
    IConfig as IEventEmitterConfig
} from '../eventemitter/IBaseEventEmitter';

export enum TickingMode {
    no = 0,
    lazy = 1,
    always = 2
}

export type TickingModeString = 'no' | 'lazy' | 'always';

export interface IConfig extends IEventEmitterConfig {
    tickingMode?: TickingMode | TickingModeString;
}

export interface ITickTask {
    start(): this;
    pause(): this;
    resume(): this;
    stop(): this;
    complete();
}