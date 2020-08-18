import { EventInstance } from './EventInstance';
import { IEventEmitter } from './IEventEmitter';
import { IEventInstance } from './IEventInstance';

export function On(emitter: IEventEmitter, event: string, callback: Function, context: unknown = emitter, once: boolean = false): IEventInstance {
    if (typeof callback !== 'function') {
        throw new TypeError('Listener not a function');
    }

    const listener = new EventInstance(callback, context, once);
    const listeners = emitter.events.get(event);

    if (!listeners) {
        emitter.events.set(event, new Set([listener]));
    }
    else {
        listeners.add(listener);
    }

    return listener;
}
