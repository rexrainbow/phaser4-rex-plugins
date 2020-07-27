import { IEventEmitter as IEE } from './events/IEventEmitter';
import { IEventInstance } from './events/IEventInstance';

export interface IConfig {
    eventEmitter?: IEE;
}

export interface IBaseEventEmitter {
    eventEmitter: IEE;
    lastEventInstance: IEventInstance;

    on(
        event: string,
        callback: Function,
        context?: unknown,
        once?: boolean
    ): this;

    once(
        event: string,
        callback: Function,
        context?: unknown
    ): this;

    off(
        event: string,
        callback?: Function,
        context?: unknown,
        once?: boolean
    ): this;

    emit(
        event: string,
        ...args: unknown[]
    ): this;

    removeAllListeners(
        event?: string
    ): this;

    clearEvent(
        event: string
    ): this;

    getListenerCount(
        event: string
    ): number;

    getEventNames(
    ): string[];

    getListeners(
        event: string
    ): Function[];

}