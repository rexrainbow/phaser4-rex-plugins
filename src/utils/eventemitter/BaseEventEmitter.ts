import { IBaseEventEmitter } from './IBaseEventEmitter';
import { IEventEmitter as IEE } from './events/IEventEmitter';
import { IEventInstance } from './events/IEventInstance';
import {
    EventEmitter as EE,
    On, Once, Off, Emit, RemoveAllListeners, ClearEvent,
    GetListenerCount, GetEventNames, GetListeners
} from './events';

export class BaseEventEmitter implements IBaseEventEmitter {
    eventEmitter: IEE;
    privateEE: boolean;
    lastEventInstance: IEventInstance;

    setEventEmitter(
        eventEmitter?: IEE
    ) {

        this.privateEE = (eventEmitter === undefined);
        this.eventEmitter = (this.privateEE) ? (new EE()) : eventEmitter;
        this.lastEventInstance = null;

        return this;
    }

    clearEventEmitter(): this {

        this.setEventEmitter(null);

        return this;
    }

    destroyEventEmitter(): this {

        this.lastEventInstance = null;
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
        once: boolean = false
    ): this {

        this.lastEventInstance = null;
        if (this.eventEmitter) { this.lastEventInstance = On(this.eventEmitter, event, callback, context, once); }

        return this;
    }

    once(
        event: string,
        callback: Function,
        context: unknown = this
    ): this {

        this.lastEventInstance = null;
        if (this.eventEmitter) { this.lastEventInstance = Once(this.eventEmitter, event, callback, context); }

        return this;
    }

    off(
        event: string,
        callback?: Function | IEventInstance,
        context?: unknown,
        once?: boolean
    ): this {

        this.lastEventInstance = null;
        if (this.eventEmitter) { Off(this.eventEmitter, event, callback, context, once); }

        return this;
    }

    emit(
        event: string,
        ...args: unknown[]
    ): this {

        this.lastEventInstance = null;
        if (this.eventEmitter) { Emit(this.eventEmitter, event, ...args); }

        return this;
    }

    removeAllListeners(
        event?: string
    ): this {

        this.lastEventInstance = null;
        if (this.eventEmitter) { RemoveAllListeners(this.eventEmitter, event); }

        return this;
    }

    clearEvent(
        event: string
    ): this {

        this.lastEventInstance = null;
        if (this.eventEmitter) { ClearEvent(this.eventEmitter, event); }
        
        return this;
    }

    getListenerCount(
        event: string
    ): number {

        this.lastEventInstance = null;
        return (this.eventEmitter) ? GetListenerCount(this.eventEmitter, event) : 0;
    }

    getEventNames(
    ): string[] {

        this.lastEventInstance = null;
        return (this.eventEmitter) ? GetEventNames(this.eventEmitter) : [];
    }

    getListeners(
        event: string
    ): Function[] {

        this.lastEventInstance = null;
        return (this.eventEmitter) ? GetListeners(this.eventEmitter, event) : [];
    }

}