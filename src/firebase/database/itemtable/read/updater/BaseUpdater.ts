import * as firebase from 'firebase/app';
import {
    IUpdater,
    IConfig
} from './IUpdater';
import { BaseEventEmitter } from '../../../../../utils/eventemitter/BaseEventEmitter';
import { JSONTree, DataType, ValueType } from '../../../../../utils/struct/tree/JSONTree';
import { TableType, } from '../../Types';
import { EventNameMapType } from '../../events/DefaultEventNames';


export abstract class BaseUpdater extends BaseEventEmitter {
    database: firebase.database.Database;
    rootPath: string;
    rootRef: firebase.database.Reference;

    parent: IUpdater;
    children: Map<string, BaseUpdater>; // Updater won't store any data
    key: string;
    fullKeyPath: string;
    type: TableType;
    eventNames: EventNameMapType;
    table: JSONTree;

    constructor({
        eventEmitter,
        parent,

        key,
        type,
        eventNames,
        table,
    }: IConfig = {}) {

        super();

        // Event emitter
        this.setEventEmitter(eventEmitter);

        this.parent = parent;
        this.children = new Map();
        this.key = key;
        if (this.parent) {
            this.fullKeyPath = ExtendKeyPath(this.parent.fullKeyPath, this.key);
        } else {
            this.fullKeyPath = '';
        }
        this.type = type;
        this.eventNames = eventNames;
        this.table = table;

        this.database = firebase.database();
        this.setRootPath();
    }

    destroy() {
        this
            .stopUpdate()
            .clear()
            .destroyEventEmitter();
    }

    setRootPath(
        rootPath?: string
    ): this {

        if (rootPath === undefined) {
            let parentRootPath = (this.parent) ? this.parent.rootPath : '';
            rootPath = `${parentRootPath}/${this.key}`;
        }
        this.rootPath = rootPath;
        this.rootRef = (rootPath !== '') ? this.database.ref(rootPath) : undefined;

        for (const [key, child] of this.children) {
            if (child instanceof BaseUpdater) {
                child.setRootPath();
            }
        }
        return this;
    }

    setData(
        key?: string | DataType,
        value?: ValueType
    ): this {

        if (arguments.length === 0) {  // Clear

            this.clear();
        } else if (typeof (key) == 'string') {

            this.setChildData(key, value); // Pass data to column-updater
        } else {

            let data = key; // JSON data
            for (const [key, child] of this.children) {
                if (!data.hasOwnProperty(key)) {
                    this.removeChild(key);
                }
            }
            for (let key in data) {
                this.setChildData(key, data[key]);
            }
        }
        return this;
    }

    clear(): this {

        this.table.removeKey(this.fullKeyPath);
        for (const [key, child] of this.children) {
            this.removeChild(key);
        }
        return this;
    }

    // Overwrite
    get childClass() {
        return null;
    }

    setChildData(
        key: string,
        value: ValueType
    ): this {

        // Store value to Tree 
        const keyPath = ExtendKeyPath(this.fullKeyPath, key);
        this.table.setValue(keyPath, value);

        if (typeof (value) !== 'object') { // Value is not a JSON, i.e. dose not have children values

        } else if (this.children.has(key)) { // Expend grandson updater

            this.children.get(key).setData(value);
        } else if (this.childClass) {  // Add new child updater

            let child = new this.childClass({
                parent: this,
                key: key,
                type: this.type,
                eventEmitter: this.eventEmitter,
                eventNames: this.eventNames,
                table: this.table
            });
            child.startUpdate();
            this.children.set(key, child);
        } else { // No child update class

        }

        return this;
    }

    removeChild(
        key: string
    ): this {

        if (this.children.has(key)) {
            this.children.get(key).destroy();
            this.children.delete(key);
        }
        return this;
    }

    // Overwrite
    startUpdate(): this {

        return this;
    }

    // Overwrite
    stopUpdate(): this {

        return this;
    }
}

function ExtendKeyPath(
    baseKeyPath: string,
    newKey: string
): string {

    if ((baseKeyPath == null) || (baseKeyPath === '')) {
        return newKey;
    } else if ((newKey == null) || (newKey === '')) {
        return baseKeyPath;
    } else {
        return `${baseKeyPath}.${newKey}`;
    }
}