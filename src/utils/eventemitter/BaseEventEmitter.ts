import { IBaseEventEmitter } from './IBaseEventEmitter';
import { IEventEmitter as IEE } from './events/IEventEmitter';
import {
    EventEmitter as EE,
    On, Once, Off, Emit, RemoveAllListeners,
    GetListenerCount, GetEventNames
} from './events';

export class BaseEventEmitter implements IBaseEventEmitter {
    eventEmitter: IEE;
    privateEE: boolean;

    setEventEmitter(
        eventEmitter?: IEE
    ) {

        this.privateEE = (eventEmitter === undefined);
        this.eventEmitter = (this.privateEE) ? (new EE()) : eventEmitter;
        return this;
    }

    destroyEventEmitter(): this {
        if (this.eventEmitter && this.privateEE) {
            RemoveAllListeners(this.eventEmitter);
            this.eventEmitter = null;
        }
        return this;
    }

    on(
        event: string,
        callback: Function,
        context: unknown = this,
        once: boolean = true
    ): this {

        if (this.eventEmitter) { On(this.eventEmitter, event, callback, context, once); }
        return this;
    }

    once(
        event: string,
        callback: Function,
        context: unknown = this
    ): this {

        if (this.eventEmitter) { Once(this.eventEmitter, event, callback, context); }
        return this;
    }

    off(
        event: string,
        callback?: Function,
        context?: unknown,
        once?: boolean
    ): this {

        if (this.eventEmitter) { Off(this.eventEmitter, event, callback, context, once); }
        return this;
    }

    emit(
        event: string,
        ...args: unknown[]
    ): this {

        if (this.eventEmitter) { Emit(this.eventEmitter, event, ...args); }
        return this;
    }

    removeAllListeners(
        event?: string
    ): this {

        if (this.eventEmitter) { RemoveAllListeners(this.eventEmitter, event); }
        return this;
    }

    getListenerCount(
        event: string
    ): number {

        return (this.eventEmitter) ? GetListenerCount(this.eventEmitter, event) : 0;
    }

    getEventNames(
    ): string[] {

        return (this.eventEmitter) ? GetEventNames(this.eventEmitter) : [];
    }
}