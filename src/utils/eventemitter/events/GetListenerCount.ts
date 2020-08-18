import { IEventEmitter } from './IEventEmitter';

export function GetListenerCount(emitter: IEventEmitter, event: string): number {
    const listeners = emitter.events.get(event);

    return (listeners) ? listeners.size : 0;
}
