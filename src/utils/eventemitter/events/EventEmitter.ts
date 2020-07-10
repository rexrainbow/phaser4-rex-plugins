import { IEventInstance } from './IEventInstance';

export class EventEmitter
{
    events: Map<string, Set<IEventInstance>>;

    constructor ()
    {
        this.events = new Map();
    }
}
