import {ReceiveMessageEvent} from '.';

export type EventNameMapType = {
    receive?: string
}

export const DefaultEventNames: EventNameMapType = {
    receive: ReceiveMessageEvent
}