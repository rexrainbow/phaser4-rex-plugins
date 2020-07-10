import { IEventEmitter as IEE } from './events/IEventEmitter';

export interface IBaseEventEmitter {
    eventEmitter: IEE;

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

    getListenerCount(
        event: string
    ): number;
}