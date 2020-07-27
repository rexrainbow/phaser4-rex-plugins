import * as firebase from 'firebase/app';
import {
    IBroadcast, IConfig,
    UserInfoType, IMessage,
} from './IBroadcast';
import { EventNameMapType, DefaultEventNames } from './events/DefaultEventNames';
import { BaseEventEmitter } from '../../../utils/eventemitter/BaseEventEmitter';
import { Send } from './Send';
import { StartReceiving, StopReceiving } from './ReceiveMethods';
import { History, IHistory } from './History';

export class Broadcast extends BaseEventEmitter implements IBroadcast {
    database: firebase.database.Database;
    rootPath: string;
    rootRef: firebase.database.Reference;

    // Sender    
    sendToRef: firebase.database.Reference;
    userInfo: UserInfoType;
    receiverID: string;
    skipFirst: boolean;
    stamp: boolean;

    // Receiver 
    receiverRef: firebase.database.Reference;
    isReceiving: boolean;
    history: IHistory;

    // Events
    eventNames: EventNameMapType;

    constructor({
        eventEmitter,
        root = '',
        senderID = '',
        senderName,
        receiverID = '',
        history = 0,
        eventNames = DefaultEventNames
    }: IConfig = {}) {

        super();

        // Event emitter
        this.setEventEmitter(eventEmitter);
        this.eventNames = eventNames;

        this.database = firebase.database();
        this.setRootPath(root);

        // Sender
        this.skipFirst = true;
        this.stamp = false;
        this.userInfo = { userID: '', userName: undefined };
        this.setSender(senderID, senderName);
        this.setReceiver(receiverID);

        // Receiver
        this.isReceiving = false;

        // History messages
        if (history === true) {
            history = -1;
        } else if (history === false) {
            history = 0;
        }
        this.history = new History({
            maxLength: history
        });

    }

    destroy(): void {

        this
            .stopReceiving()
            .destroyEventEmitter();
    }

    get userID() {
        return this.userInfo.userID;
    }

    set userID(value) {
        this.userInfo.userID = value;
    }

    get userName() {
        return this.userInfo.userName;
    }

    set userName(value) {
        this.userInfo.userName = value;
    }

    setRootPath(rootPath: string): this {

        this.rootPath = rootPath;
        this.sendToRef = undefined;
        this.receiverRef = undefined;
        return this;
    }

    setSender(
        userID: string | UserInfoType,
        userName?: string
    ): this {

        if (typeof (userID) === 'string') {
            this.userID = userID;
            this.userName = userName;
        } else {
            this.userInfo = userID;
        }
        return this;
    }

    setReceiver(
        receiverID: string
    ): this {

        this.receiverID = receiverID;
        return this;
    }

    changeUserName(
        userID: string,
        userName: string
    ): this {

        if (userID === this.userID) {
            this.userName = userName;
        }
        this.history.changeUserName(userID, userName);

        return this;
    }

    getHistory(): IMessage[] {

        return this.history.records;
    }

    clearHistory(): this {

        this.history.clear();
        return this;
    }

    send(
        message?: unknown
    ): Promise<any> {

        return Send(this, message);
    }

    startReceiving(): this {

        StartReceiving(this);
        return this;
    }

    stopReceiving(): this {

        StopReceiving(this);
        return this;
    }
}