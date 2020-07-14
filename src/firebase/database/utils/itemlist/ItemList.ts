import * as firebase from 'firebase/app';
import { BaseEventEmitter } from '../../../../utils/eventemitter/BaseEventEmitter';
import {
    IItemList, IConfig,
    UpdateMode, UpdateModeString, UpdaterType, GetItemCallbackType, ItemType,
    EventNameMapType, DefaultEventNames
} from './IItemList';
import { Updaters } from './updaters';
import {
    Clear, GetItems, HasItem,
    GetItemIndexFromItemID, GetItemFromItemID,
    ForEach, UpdateItemID2Index
} from './ItemMethods';


export class ItemList<T> extends BaseEventEmitter implements IItemList {
    mode: UpdateMode;
    updater: UpdaterType;
    query: firebase.database.Query;
    isUpdating: boolean;

    keyItemID: string;
    getItemCallback: GetItemCallbackType;
    getItemCallbackScope: unknown;
    items: T[];
    itemID2Index: Map<string, number>;

    eventNames: EventNameMapType;

    constructor({
        eventEmitter,
        itemIDKey = '__itemID__',
        mode = UpdateMode.child,
        getItemCallback = DefaultGetItemCallback,
        getItemCallbackScope,
        query,
        eventNames = DefaultEventNames
    }: IConfig = {}) {

        super();

        // Event emitter
        this.setEventEmitter(eventEmitter);
        this.eventNames = eventNames;

        this.isUpdating = false;
        this.items = [];
        this.itemID2Index = new Map();
        this.setItemIDKey(itemIDKey);
        this.setMode(mode);

        if (getItemCallbackScope === undefined) {
            getItemCallbackScope = this;
        }
        this.setGetitemCallback(getItemCallback, getItemCallbackScope);
        this.setQuery(query);
    }

    destroy() {
        this
            .stopUpdate()
            .clear();
    }

    setItemIDKey(
        key: string
    ): this {

        this.keyItemID = key;
        return this;
    }

    setMode(
        mode: UpdateMode | UpdateModeString
    ): this {

        if (typeof (mode) === 'string') {
            mode = UpdateMode[mode];
        }

        this.mode = mode;
        this.updater = Updaters[mode];
        return this;
    }

    setGetitemCallback(
        callback: GetItemCallbackType,
        scope: unknown
    ): this {

        this.getItemCallback = callback;
        this.getItemCallbackScope = scope;
        return this;
    }

    setQuery(
        query: firebase.database.Query
    ): this {

        this.query = query;
        return this;
    }

    startUpdate(
        query: firebase.database.Query
    ): this {

        if (query) {
            this.setQuery(query);
        } else if (this.query) {
            query = this.query;
        } else { // !query && !this.query
            return this;
        }

        this
            .stopUpdate()
            .clear();

        this.isUpdating = true;
        this.updater.start(this, query);
        return this;
    }

    stopUpdate(): this {

        if ((!this.query) || (!this.isUpdating)) {
            return this;
        }

        this.isUpdating = false;
        this.updater.stop(this);
        return this;
    }

    clear(): this {

        Clear(this);
        return this;
    }

    getItems(): T[] {

        return GetItems(this) as T[];
    }

    hasItem(itemID: string): boolean {

        return HasItem(this, itemID);
    }

    getItemIndexFromItemID(
        itemID: string
    ): number {

        return GetItemIndexFromItemID(this, itemID);
    }

    getItemFromItemID(
        itemID: string
    ): T {

        return GetItemFromItemID(this, itemID) as T;
    }

    forEach(
        callback: ((value: T, index: number, array: T[]) => void),
        scope?: unknown
    ): this {

        ForEach(this, callback, scope);
        return this;
    }

    updateItemID2Index(): this {

        UpdateItemID2Index(this);
        return this;
    }
}

const DefaultGetItemCallback: GetItemCallbackType = function (
    this: IItemList,
    snapshot: firebase.database.DataSnapshot
): ItemType {

    let item: ItemType = snapshot.val();
    item[this.keyItemID] = snapshot.key;
    return item;
}