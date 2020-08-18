import { IBaseEventEmitter } from './IBaseEventEmitter';
import { IEventEmitter as IEE } from './events/IEventEmitter';
import { IEventInstance } from './events/IEventInstance';
import {
    On, Once, Off, Emit, RemoveAllListeners, ClearEvent,
    GetListenerCount, GetEventNames, GetListeners
} from './events';

type Constructor<T> = new (...args: any[]) => T;

export function ExtendEventEmitter<T extends Constructor<{}>>(Base: T) {

    return class extends Base implements IBaseEventEmitter {

        events: Map<string, Set<IEventInstance>> = null;
        privateEE: boolean;
        lastEventInstance: IEventInstance;

        setEventEmitter(
            eventEmitter?: undefined | IEE | false | null
        ) {

            this.destroyEventEmitter();

            this.privateEE = (eventEmitter === undefined);

            if (this.privateEE) {
                this.events = new Map();
            } else if (eventEmitter) {
                this.events = eventEmitter.events;
            } else {
                this.events = null;
            }

            this.lastEventInstance = null;

            return this;
        }

        getEventEmitter(): IEE {
            return this;
        }

        clearEventEmitter(): this {

            this.setEventEmitter(null);

            return this;
        }

        destroyEventEmitter(): this {

            this.lastEventInstance = null;
            if (this.events && this.privateEE) {
                RemoveAllListeners(this);
                this.events = null;
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
            if (this.events) { this.lastEventInstance = On(this, event, callback, context, once); }

            return this;
        }

        once(
            event: string,
            callback: Function,
            context: unknown = this
        ): this {

            this.lastEventInstance = null;
            if (this.events) { this.lastEventInstance = Once(this, event, callback, context); }

            return this;
        }

        off(
            event: string,
            callback?: Function | IEventInstance,
            context?: unknown,
            once?: boolean
        ): this {

            this.lastEventInstance = null;
            if (this.events) { Off(this, event, callback, context, once); }

            return this;
        }

        emit(
            event: string,
            ...args: unknown[]
        ): this {

            this.lastEventInstance = null;
            if (this.events) { Emit(this, event, ...args); }

            return this;
        }

        removeAllListeners(
            event?: string
        ): this {

            this.lastEventInstance = null;
            if (this.events) { RemoveAllListeners(this, event); }

            return this;
        }

        clearEvent(
            event: string
        ): this {

            this.lastEventInstance = null;
            if (this.events) { ClearEvent(this, event); }

            return this;
        }

        getListenerCount(
            event: string
        ): number {

            this.lastEventInstance = null;
            return (this.events) ? GetListenerCount(this, event) : 0;
        }

        getEventNames(
        ): string[] {

            this.lastEventInstance = null;
            return (this.events) ? GetEventNames(this) : [];
        }

        getListeners(
            event: string
        ): Function[] {

            this.lastEventInstance = null;
            return (this.events) ? GetListeners(this, event) : [];
        }
    }
}