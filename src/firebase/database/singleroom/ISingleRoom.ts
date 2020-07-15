import * as firebase from 'firebase/app';
import { IBase } from '../utils/IBase';
import {
    IBaseEventEmitter,
    IConfig as IEventEmitterConfig
} from '../../../utils/eventemitter/IBaseEventEmitter';
import { OnlineUserList } from '../onlineuserlist';
import { Broadcast } from '../broadcast';
import { ItemTable } from '../itemtable';
import { TableType, TableTypeString } from '../itemtable/Types';

export type UserInfoType = {
    userID: string,
    userName: string
}

export type BroadcastConfig = {
    history?: number | boolean;
}

export type ItemTableConfig = {
    key: string,
    type?: TableType | TableTypeString
}

export interface IConfig extends IEventEmitterConfig {
    root?: string;
    userID?: string | UserInfoType;
    userName?: string;
    maxUsers?: number; // User list
    broadcast?: boolean | BroadcastConfig;  // Broadcast
    tables?: ItemTableConfig[] | false; // Item Table
}

export interface ISingleRoom extends IBaseEventEmitter, IBase {
    userInfo: UserInfoType;
    userID: string;
    userName: string;
    leftRoomFlag: boolean;

    userList: OnlineUserList;
    broadcast: Broadcast;
    tables: Map<string, ItemTable>;

}