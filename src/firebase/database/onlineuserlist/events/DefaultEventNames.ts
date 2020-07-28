export type EventNameMapType = {
    join?: string,
    leave?: string,
    update?: string,
    change?: string,
    init?: string,
    changename?: string
};

import {
    JoinEvent,
    LeaveEvent,
    UpdateEvent,
    ChangeEvent,
    ChangeNameEvent,
    InitEvent
} from '.';

export const DefaultEventNames: EventNameMapType = {
    join: JoinEvent,
    leave: LeaveEvent,
    update: UpdateEvent,
    change: ChangeEvent,
    init: InitEvent,
    changename: ChangeNameEvent
};
