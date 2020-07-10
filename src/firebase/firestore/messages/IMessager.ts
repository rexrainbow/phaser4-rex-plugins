import * as firebase from 'firebase/app';
import { IBase } from '../utils/IBase';
import {
    IBaseEventEmitter,
    IConfig as IEventEmitterConfig
} from '../../../utils/eventemitter/IBaseEventEmitter';
import { IPageLoader } from '../pageloader/IPageLoader';



export type UserInfoType = {
    userID: string,
    userName: string
}

export type MessageType = {
    senderID: string,
    message: unknown,
    timestamp: unknown,
    senderName?: string,
    receiverID?: string
}

export interface IConfig extends IEventEmitterConfig {
    root?: string;
    senderID?: string;
    senderName?: string;
    receiverID?: string;
    pageItemCount?: number;
}

export interface IMessager extends IBaseEventEmitter, IBase {

    userInfo: UserInfoType;
    userID: string;
    userName: string;
    receiverID: string;

    resetQueryFlag: boolean;
    skipFirst: boolean;
    unsubscribe: () => void;

    page: IPageLoader;

    cacheMessages: MessageType[];
}