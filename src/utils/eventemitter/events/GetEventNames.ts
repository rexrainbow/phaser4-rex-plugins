import { IEventEmitter } from './IEventEmitter';

export function GetEventNames(emitter: IEventEmitter): string[] {
    return [...emitter.events.keys()];
}
