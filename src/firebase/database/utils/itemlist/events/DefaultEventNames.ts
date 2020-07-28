export type EventNameMapType = {
    update?: string,
    add?: string,
    remove?: string,
    change?: string
};

import {
    AddEvent,
    RemoveEvent,
    ChangeEvent,
    UpdateEvent
} from '.';

export const DefaultEventNames: EventNameMapType = {
    add: AddEvent,
    remove: RemoveEvent,
    update: UpdateEvent,
    change: ChangeEvent
};