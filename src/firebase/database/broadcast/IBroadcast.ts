import * as firebase from 'firebase/app';
import { IBase } from '../utils/IBase';
import {
    IBaseEventEmitter,
    IConfig as IEventEmitterConfig
} from '../../../utils/eventemitter/IBaseEventEmitter';
import { IHistory } from './History';

export type UserInfoType = {
    userID: string,
    userName: string
}

export interface IMessage {

    message: unknown;
    senderID: string;
    senderName?: string;
    stamp?: boolean;
}

export type EventNameMapType = {
    receive?: string
}

export const DefaultEventNames: EventNameMapType = {
    receive: 'receive'
}

export interface IConfig extends IEventEmitterConfig {
    root?: string;

    senderID?: string;
    senderName?: string;
    receiverID?: string;
    history?: number | boolean;

    eventNames?: EventNameMapType;
}

export interface IBroadcast extends IBaseEventEmitter, IBase {

    // Sender    
    sendToRef: firebase.database.Reference;
    userInfo: UserInfoType;
    userID: string;
    userName: string;
    receiverID: string;
    skipFirst: boolean;
    stamp: boolean;

    // Receiver 
    receiverRef: firebase.database.Reference;
    isReceiving: boolean;
    history: IHistory;

    // Events
    eventNames: EventNameMapType
}