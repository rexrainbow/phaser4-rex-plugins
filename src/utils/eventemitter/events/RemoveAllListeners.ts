import { IEventEmitter } from './IEventEmitter';

export function RemoveAllListeners (emitter: IEventEmitter, event?: string): void
{
    if (!event)
    {
        emitter.events.clear();
    }
    else
    {
        emitter.events.delete(event);
    }
}
