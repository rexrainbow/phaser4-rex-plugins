import * as firebase from 'firebase/app';
import { IBase } from '../utils/IBase';
import {
    IBaseEventEmitter,
    IConfig as IEventEmitterConfig
} from '../../../utils/eventemitter/IBaseEventEmitter';
import { OnlineUserList } from '../onlineuserlist';
import { ItemList } from '../utils/itemlist';
import { Broadcast } from '../broadcast';
import { ItemTable } from '../itemtable';
import { TableType, TableTypeString } from '../itemtable/Types';

export type UserInfoType = {
    userID: string,
    userName: string
}

export type RoomInfoType = {
    roomID: string,
    roomName: string
}

export type RoomStateType = 'open' | 'closed';

export type RoomMetadataType = {
    name?: string,
    filter?: string,
    maxUsers?: number,
    moderators?: { [userID: string]: true },
    permission?: 'anyone' | 'blocklist' | 'allowlist',
    blocklist?: { [userID: string]: true },
    allowlist?: { [userID: string]: true },
}

export type RoomFilterDataType = {
    roomID?: string,
    name?: string,
    filter: string,
    data?: { [key: string]: any }
}

export type BroadcastConfig = {
    history?: number | boolean;
}

export type ItemTableConfig = {
    key: string,
    type?: TableType | TableTypeString
}

export interface ICreateRoomConfig {
    roomID?: string;
    roomName?: string;
    roomType?: string;
    maxUsers?: number;
    presisted?: boolean;
    door?: RoomStateType;
    join?: boolean;
    filterData?: { [key: string]: any }
}

export interface ICreateRandomRoomCongfig extends ICreateRoomConfig {
    digits?: number;
    candidates?: string;
    retry?: number;
}

export interface IJoinRoomConfig {
    leftThenJoin?: boolean,
    roomID: string
}

export interface IJoinRandomRoomConfig {
    leftThenJoin?: boolean,
    roomType?:string
}

export interface IConfig extends IEventEmitterConfig {
    root?: string;
    userID?: string | UserInfoType;
    userName?: string;
    broadcast?: boolean | BroadcastConfig;  // Broadcast
    tables?: ItemTableConfig[];
}

export interface IRoom extends IBaseEventEmitter, IBase {
    userInfo: UserInfoType;
    userID: string;
    userName: string;
    isRoomCreator: boolean;
    roomID: string;
    roomName: string;
    roomType: string;
    doorState: RoomStateType;
    leftRoomFlag: boolean;
    isRemoveRoomWhenLeft: boolean;

    userList: OnlineUserList;
    roomList: ItemList<RoomFilterDataType>;
    broadcast: Broadcast;
    tables: Map<string, ItemTable>;
}