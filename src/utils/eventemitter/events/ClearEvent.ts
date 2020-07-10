import { IEventEmitter } from './IEventEmitter';

export function ClearEvent (emitter: IEventEmitter, event: string): IEventEmitter
{
    emitter.events.delete(event);

    return emitter;
}
