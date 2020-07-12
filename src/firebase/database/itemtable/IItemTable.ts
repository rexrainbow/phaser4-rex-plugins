import * as firebase from 'firebase/app';
import { IBase } from '../utils/IBase';
import {
    IBaseEventEmitter,
    IConfig as IEventEmitterConfig
} from '../../../utils/eventemitter/IBaseEventEmitter';
import { Tree } from '../../../utils/struct/Tree';

export enum TableType {
    '1d' = 1,
    '2d' = 2,
    '3d' = 3
}

export type TableTypeString = '1d' | '2d' | '3d';

export interface IConfig extends IEventEmitterConfig {

}

export interface IItemTable extends IBaseEventEmitter, IBase {
    table: Tree;
    tableType: TableType;
    initialFlag: boolean;
    // updater:
}