export type EventNameMapType = {
    init?: string,
    update?: string,
    addkey0?: string,
    removekey0?: string,
    changekey0?: string,
    addkey1?: string,
    removekey1?: string,
    changekey1?: string,
    addkey2?: string,
    removekey2?: string,
    changekey2?: string
}

import {
    InitEvent,
    UpdateEvent,
    AddKey0Event,
    AddKey1Event,
    AddKey2Event,
    RemoveKey0Event,
    RemoveKey1Event,
    RemoveKey2Event,
    ChangeKey0Event,
    ChangeKey1Event,
    ChangeKey2Event
} from '.';

export const DefaultEventNames: EventNameMapType = {
    init: InitEvent,
    update: UpdateEvent,
    addkey0: AddKey0Event,
    removekey0: RemoveKey0Event,
    changekey0: ChangeKey0Event,
    addkey1: AddKey1Event,
    removekey1: RemoveKey1Event,
    changekey1: ChangeKey1Event,
    addkey2: AddKey2Event,
    removekey2: RemoveKey2Event,
    changekey2: ChangeKey2Event
}