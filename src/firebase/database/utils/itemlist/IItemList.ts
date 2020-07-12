import * as firebase from 'firebase/app';
import {
    IBaseEventEmitter,
    IConfig as IEventEmitterConfig
} from '../../../../utils/eventemitter/IBaseEventEmitter';

export enum UpdateMode {
    once = 0,
    child = 1,
    all = 2
};

export type UpdateModeString = 'once' | 'child' | 'all';

export type EventNameMapType = {
    update?: string,
    add?: string,
    remove?: string,
    change?: string
};

export const DefaultEventNames: EventNameMapType = {
    update: 'update',
    add: 'add',
    remove: 'remove',
    change: 'change'
};

export type ItemType = { [key: string]: any };

export type GetItemCallbackType = (snapshot: firebase.database.DataSnapshot) => ItemType;

export type UpdaterType = {
    start: ((itemList: IItemList, query: firebase.database.Query) => void),
    stop: ((itemList: IItemList) => void)
};


export interface IConfig extends IEventEmitterConfig {

    itemIDKey?: string;
    mode?: UpdateMode | UpdateModeString;
    getItemCallback?: GetItemCallbackType;
    getItemCallbackScope?: unknown;
    query?: firebase.database.Query;

    eventNames?: EventNameMapType;
};

export interface IItemList extends IBaseEventEmitter {

    mode: UpdateMode;
    updater: UpdaterType;
    query: firebase.database.Query;
    isUpdating: boolean;

    keyItemID: string;
    getItemCallback: GetItemCallbackType;
    getItemCallbackScope: unknown;
    items: ItemType[];
    itemID2Index: Map<string, number>;

    eventNames: EventNameMapType;
};