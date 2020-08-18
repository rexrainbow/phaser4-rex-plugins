import { EventInstance } from './EventInstance';
import { IEventEmitter } from './IEventEmitter';
import { IEventInstance } from './IEventInstance';

export function Off(emitter: IEventEmitter, event: string, callback?: Function | IEventInstance, context?: unknown, once?: boolean): IEventEmitter {
    const events = emitter.events;
    const listeners = events.get(event);

    if (!callback) {
        //  Remove all events matching the given key
        events.delete(event);
    }
    else if (callback instanceof EventInstance) {
        listeners.delete(callback as IEventInstance);
    }
    else {
        const hasContext: boolean = !context;
        const hasOnce: boolean = (once !== undefined);

        for (const listener of listeners) {
            if (
                (listener.callback === callback) &&
                (hasContext && listener.context === context) &&
                (hasOnce && listener.once === once)
            ) {
                listeners.delete(listener);
            }
        }
    }

    if (listeners.size === 0) {
        events.delete(event);
    }

    return emitter;
}
