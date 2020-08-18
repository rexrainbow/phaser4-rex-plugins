import { IEventEmitter } from './IEventEmitter';
import { IEventInstance } from './IEventInstance';
import { On } from './On';

export function Once(emitter: IEventEmitter, event: string, callback: Function, context: unknown = emitter): IEventInstance {
    return On(emitter, event, callback, context, true);
}
