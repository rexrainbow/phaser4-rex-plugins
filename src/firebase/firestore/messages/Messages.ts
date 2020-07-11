import * as firebase from 'firebase/app';
import {
    IMessages,
    IConfig, UserInfoType, IMessage
} from './IMessages';
import { BaseEventEmitter } from '../../../utils/eventemitter/BaseEventEmitter';
import { IPageLoader } from '../pageloader/IPageLoader';
import { StaticPageLoader } from '../pageloader/StaticPageLoader';
import { Send } from './Send';
import { StartReceiving, StopReceiving, LoadPreviousMessages } from './ReceiveMethods';

export class Messages extends BaseEventEmitter implements IMessages {
    database: firebase.firestore.Firestore;
    rootPath: string;
    rootRef: firebase.firestore.CollectionReference;
    userInfo: UserInfoType;
    receiverID: string;

    resetQueryFlag: boolean;
    skipFirst: boolean;
    unsubscribe: () => void;

    page: IPageLoader;

    cacheMessages: IMessage[];

    constructor({
        eventEmitter,
        root = '',
        senderID = '',
        senderName = '',
        receiverID,
        pageItemCount = 100,
    }: IConfig = {}) {

        super();

        // Event emitter
        this.setEventEmitter(eventEmitter);

        this.database = firebase.firestore();
        this.setRootPath(root);

        this.userInfo = { userID: '', userName: undefined };
        this.setSender(senderID, senderName);
        this.setReceiver(receiverID);

        this.skipFirst = true;
        this.unsubscribe = undefined;
        this.page = new StaticPageLoader();
        this.setPageItemCount(pageItemCount);
        this.resetQueryFlag = true;
        this.cacheMessages = [];
    }

    destroy() {
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

    setRootPath(
        rootPath: string
    ): this {

        this.resetQueryFlag = this.resetQueryFlag || (this.rootPath !== rootPath);
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
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
        receiverID?: string
    ): this {

        this.resetQueryFlag = this.resetQueryFlag || (this.receiverID !== receiverID);
        this.receiverID = receiverID;
        return this;
    }

    setPageItemCount(
        count: number
    ): this {

        this.page.setItemCount(count);
        return this;
    }

    get hasPreviousMessage() {
        return (this.page.isFullPage !== false);
    }

    send(
        message: unknown
    ): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {

        return Send(this, message);
    }

    startReceiving(
    ): this {

        StartReceiving(this);
        return this;
    }

    stopReceiving(
    ): this {

        StopReceiving(this);
        return this;
    }

    loadPreviousMessages(
    ): Promise<IMessage[]> {

        return LoadPreviousMessages(this);
    }
}