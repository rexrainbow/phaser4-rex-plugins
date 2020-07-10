import { IEventInstance } from './IEventInstance';

export interface IEventEmitter
{
    events: Map<string, Set<IEventInstance>>;
}
