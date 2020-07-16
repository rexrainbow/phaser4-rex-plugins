import * as firebase from 'firebase/app';
import {
    IItemTable,
    IConfig
} from './IItemTable';
import { BaseEventEmitter } from '../../../utils/eventemitter/BaseEventEmitter';
import {
    TableType, TableTypeString,
    EventNameMapType, DefaultEventNames,
    TransactionCallbackType
} from './Types';
import { JSONTree } from '../../../utils/struct/tree/JSONTree';
import { IUpdater } from './read/updater/IUpdater';
import { CreateUpdater } from './read/CreateUpdater';
import { Load } from './read/Load';
import { SetData } from './write/SetData';
import { GetItemRef } from './GetItemRef';
import { RemoveData } from './write/RemoveData';
import { IncValue } from './write/IncValue';
import { Transaction } from './write/Transaction';
import { UpdateData } from './write/UpdateData';
import { RemoveDataOnDisconnect } from './write/RemoveDataOnDisconnect';
import { SetDataOnDisconnect } from './write/SetDataOnDisconnect';

export class ItemTable extends BaseEventEmitter implements IItemTable {
    database: firebase.database.Database;
    rootPath: string;
    rootRef: firebase.database.Reference;

    table: JSONTree;
    tableType: TableType;
    initialFlag: boolean;
    updater: IUpdater;

    eventNames: EventNameMapType;

    constructor({
        eventEmitter,
        root = '',
        type = TableType['3d'],
        eventNames = DefaultEventNames
    }: IConfig = {}) {

        super();
        // Event emitter
        this.setEventEmitter(eventEmitter);
        this.eventNames = eventNames;

        this.database = firebase.database();
        this.table = new JSONTree();
        this.setTableType(type);
        this.setRootPath(root);
        this.initialFlag = false;
    }

    destroy() {
        this.updater.destroy();
        this
            .destroyEventEmitter()
            .stopUpdate();
    }

    setRootPath(
        rootPath: string
    ): this {

        this.rootPath = rootPath;
        this.rootRef = (rootPath !== '') ? this.database.ref(this.rootPath) : null;
        this.updater.setRootPath(rootPath);
        return this;
    }

    setTableType(
        type: TableType | TableTypeString
    ): this {

        if (typeof (type) === 'string') {
            type = TableType[type];
        }

        this.tableType = type;
        if (this.updater) {
            this.updater.destroy();
        }
        this.updater = CreateUpdater(this);
        return this;
    }

    startUpdate() {

        Load(this);
        this.updater.startUpdate();
        return this;
    }

    stopUpdate() {

        this.updater.stopUpdate();
        return this;
    }

    clear() {
        this.updater.clear();
        return this;
    }

    getData() {
        return this.table.getValue(...arguments);
    }

    cloneData() {
        return this.table.cloneValue(...arguments);
    }

    getItemRef(
        key0?: string,
        key1?: string,
        key2?: string
    ): firebase.database.Reference {

        return GetItemRef(this, key0, key1, key2);
    }

    setData(value: unknown): Promise<any>;
    setData(key0: string, value: unknown): Promise<any>;
    setData(key0: string, key1: string, value: unknown): Promise<any>;
    setData(key0: string, key1: string, key2: string, value: unknown): Promise<any>;
    setData(
        ...args: [unknown] | [string, unknown] | [string, string, unknown] | [string, string, string, unknown]
    ): Promise<any> {

        return SetData(this, ...args);
    }

    removeData(key0: string): Promise<any>;
    removeData(key0: string, key1: string): Promise<any>;
    removeData(key0: string, key1: string, key2: string): Promise<any>;
    removeData(
        ...args: [string] | [string, string] | [string, string, string]
    ): Promise<any> {

        return RemoveData(this, ...args);
    }

    incValue(value: unknown): Promise<any>;
    incValue(key0: string, value: unknown): Promise<any>;
    incValue(key0: string, key1: string, value: unknown): Promise<any>;
    incValue(key0: string, key1: string, key2: string, value: unknown): Promise<any>;
    incValue(
        ...args: [unknown] | [string, unknown] | [string, string, unknown] | [string, string, string, unknown]
    ): Promise<any> {

        return IncValue(this, ...args);
    }

    transaction(callback: TransactionCallbackType): Promise<any>;
    transaction(key0: string, callback: TransactionCallbackType): Promise<any>;
    transaction(key0: string, key1: string, callback: TransactionCallbackType): Promise<any>;
    transaction(key0: string, key1: string, key2: string, callback: TransactionCallbackType): Promise<any>;
    transaction(
        ...args: [TransactionCallbackType] |
            [string, TransactionCallbackType] |
            [string, string, TransactionCallbackType] |
            [string, string, string, TransactionCallbackType]
    ): Promise<any> {

        return Transaction(this, ...args);
    }

    updateData(
        data: object
    ): Promise<any> {

        return UpdateData(this, data);
    }

    removeDataOnDisconnect(key0: string): Promise<any>;
    removeDataOnDisconnect(key0: string, key1: string): Promise<any>;
    removeDataOnDisconnect(key0: string, key1: string, key2: string): Promise<any>;
    removeDataOnDisconnect(
        ...args: [string] | [string, string] | [string, string, string]
    ): Promise<any> {

        return RemoveDataOnDisconnect(this, ...args);
    }

    setDataOnDisconnect(value: unknown): Promise<any>;
    setDataOnDisconnect(key0: string, value: unknown): Promise<any>;
    setDataOnDisconnect(key0: string, key1: string, value: unknown): Promise<any>;
    setDataOnDisconnect(key0: string, key1: string, key2: string, value: unknown): Promise<any>;
    setDataOnDisconnect(
        ...args: [unknown] | [string, unknown] | [string, string, unknown] | [string, string, string, unknown]
    ): Promise<any> {

        return SetDataOnDisconnect(this, ...args);
    }
}