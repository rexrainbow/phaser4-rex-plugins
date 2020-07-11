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

export interface IMessage {
    senderID: string,
    message: unknown,
    timestamp: firebase.firestore.FieldValue | Date,
    // Send (firebase.firestore.FieldValue), receive (firebase.firestore.Timestamp), transfer to (Date)
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

export interface IMessages extends IBaseEventEmitter, IBase {

    userInfo: UserInfoType;
    userID: string;
    userName: string;
    receiverID: string;

    resetQueryFlag: boolean;
    skipFirst: boolean;
    unsubscribe: () => void;

    page: IPageLoader;

    cacheMessages: IMessage[];
}