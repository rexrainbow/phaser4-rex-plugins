import * as firebase from 'firebase/app';
import { IBase } from '../utils/IBase';
import {
    IBaseEventEmitter,
    IConfig as IEventEmitterConfig
} from '../../../utils/eventemitter/IBaseEventEmitter';
import { JSONTree } from '../../../utils/struct/tree/JSONTree';
import { TableType, TableTypeString } from './Types';
import { EventNameMapType } from './events/DefaultEventNames';
import { IUpdater } from './read/updater/IUpdater';

export interface IConfig extends IEventEmitterConfig {
    root?: string;

    type?: TableType | TableTypeString;
    eventNames?: EventNameMapType;
}

export interface IItemTable extends IBaseEventEmitter, IBase {
    table: JSONTree;
    tableType: TableType;
    initialFlag: boolean;
    updater: IUpdater;

    eventNames: EventNameMapType;
}