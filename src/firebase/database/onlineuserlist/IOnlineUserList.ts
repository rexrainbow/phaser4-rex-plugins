import * as firebase from 'firebase/app';
import { IBase } from '../utils/IBase';
import {
    IBaseEventEmitter,
    IConfig as IEventEmitterConfig
} from '../../../utils/eventemitter/IBaseEventEmitter';
import { ItemList } from '../utils/itemlist';

export type UserInfoType = {
    userID: string,
    userName: string,
    joinAt?: string
};

import { EventNameMapType } from './events/DefaultEventNames';

export interface IConfig extends IEventEmitterConfig {
    root?: string;

    userID?: string | UserInfoType;
    userName?: string;
    maxUsers?: number;

    eventNames?: EventNameMapType;
};

export interface IOnlineUserList extends IBaseEventEmitter, IBase {
    userInfo: UserInfoType;
    userID: string;
    userName: string;

    userID2ItemID: Map<string, string>;
    userList: ItemList<UserInfoType>;
    maxUsers: number;
    isInList: boolean;

    eventNames: EventNameMapType;
};