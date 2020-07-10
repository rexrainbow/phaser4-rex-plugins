import { IEventEmitter } from './IEventEmitter';

export function Emit (emitter: IEventEmitter, event: string, ...args: unknown[]): boolean
{
    if (emitter.events.size === 0 || !emitter.events.has(event))
    {
        return false;
    }

    const listeners = emitter.events.get(event);

    for (const ee of listeners)
    {
        ee.callback.apply(ee.context, args);

        if (ee.once)
        {
            listeners.delete(ee);
        }
    }

    if (listeners.size === 0)
    {
        emitter.events.delete(event);
    }

    return true;
}
