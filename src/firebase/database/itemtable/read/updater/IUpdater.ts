import {
    IBaseEventEmitter,
    IConfig as IEventEmitterConfig
} from '../../../../../utils/eventemitter/IBaseEventEmitter';
import { IBase } from '../../../utils/IBase';
import { TableType } from '../../Types';
import { EventNameMapType } from '../../events/DefaultEventNames';
import { JSONTree } from '../../../../../utils/struct/tree/JSONTree';

export interface IConfig extends IEventEmitterConfig {
    parent?: IUpdater;

    key?: string;
    type?: TableType;
    eventNames?: EventNameMapType;
    table?: JSONTree;
}

export interface IUpdater extends IBaseEventEmitter, IBase {
    parent: IUpdater;
    children: Map<string, IUpdater>;
    key: string;
    fullKeyPath: string;
    type: TableType;
    eventNames: EventNameMapType;
    table: JSONTree;

    destroy(): void;

    setRootPath(
        rootPath?: string
    ): this;

    startUpdate(): this;

    stopUpdate(): this;

    clear(): void;
}