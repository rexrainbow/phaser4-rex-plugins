export enum TableType {
    '1d' = 1,
    '2d' = 2,
    '3d' = 3
}

export type TableTypeString = '1d' | '2d' | '3d';

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

export const DefaultEventNames: EventNameMapType = {
    init: 'init',
    update: 'update',
    addkey0: 'addkey0',
    removekey0: 'removekey0',
    changekey0: 'changekey0',
    addkey1: 'addkey1',
    removekey1: 'removekey1',
    changekey1: 'changekey1',
    addkey2: 'addkey2',
    removekey2: 'removekey2',
    changekey2: 'changekey2'
}

export type TransactionCallbackType = (preValue: any) => any;