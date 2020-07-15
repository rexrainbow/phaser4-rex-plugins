import * as firebase from 'firebase/app';
import { BaseEventEmitter } from '../../../utils/eventemitter/BaseEventEmitter';
import {
    IOnlineUserList, IConfig,
    UserInfoType,
    EventNameMapType, DefaultEventNames
} from './IOnlineUserList';
import { ItemList } from '../utils/itemlist';
import { Join } from './Join';
import { Leave } from './Leave';
import { ChangeUserName } from './ChangeUserName';
import {
    Contains, GetUserRef, GetUser, GetUsers,
    Clear, ForEach, IsFirstUser, IsFull
} from './UserMethods';


export class OnlineUserList extends BaseEventEmitter implements IOnlineUserList {
    database: firebase.database.Database;
    rootPath: string;
    rootRef: firebase.database.Reference;

    userInfo: UserInfoType;

    userID2ItemID: Map<string, string>;
    userList: ItemList<UserInfoType>;
    maxUsers: number;
    isInList: boolean;

    eventNames: EventNameMapType;

    constructor({
        eventEmitter,
        root = '',
        userID = '',
        userName = '',
        maxUsers = 0,
        eventNames = DefaultEventNames
    }: IConfig = {}) {

        super();

        // Event emitter
        this.setEventEmitter(eventEmitter);
        this.eventNames = eventNames;

        this.database = firebase.database();
        this.setRootPath(root);

        this.userInfo = { userID: '', userName: '' };
        this.setUser(userID, userName);
        this.setMaxUsers(maxUsers);
        this.userList = new ItemList({
            eventEmitter: this.eventEmitter, // Use the same event-emitter
            itemIDKey: 'joinAt',
            eventNames: {
                add: eventNames.join,
                remove: eventNames.leave,
                update: eventNames.update,
                change: eventNames.change
            }
        });

        this.isInList = false;
        this.userID2ItemID = new Map();
        this.userList
            .on(this.eventNames.join, function (
                this: IOnlineUserList,
                user: UserInfoType
            ) {

                this.userID2ItemID.set(user.userID, user.joinAt);
                if (user.userID === this.userInfo.userID) {
                    this.emit(this.eventNames.init, GetUsers(this));
                }
            }, this)
            .on(this.eventNames.leave, function (
                this: IOnlineUserList,
                user: UserInfoType
            ) {

                this.userID2ItemID.delete(user.userID);
                if (user.userID === this.userID) {
                    this.isInList = false;
                }
            }, this)
            .on(this.eventNames.change, function (
                this: IOnlineUserList,
                currUserInfo: UserInfoType,
                prevUserInfo: UserInfoType) {

                let userID = currUserInfo.userID,
                    userName = currUserInfo.userName,
                    prevUserName = prevUserInfo.userName;
                if (userName !== prevUserName) {
                    this.emit(this.eventNames.changename, userID, userName, prevUserName);
                }
            }, this)
    }

    destroy() {
        this
            .stopUpdate()
            .destroyEventEmitter()
            .leave();

        this.userList.destroy();
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

    setRootPath(rootPath) {
        this.rootPath = rootPath;
        this.rootRef = this.database.ref(this.rootPath);
        return this;
    }

    setUser(
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

    setMaxUsers(
        maxUsers: number
    ): this {

        this.maxUsers = maxUsers;
        return this;
    }

    clear(): this {

        Clear(this);
        return this;
    }

    forEach(
        callback: ((value: UserInfoType, index: number, array: UserInfoType[]) => void),
        scope?: unknown
    ): this {

        ForEach(this, callback, scope);
        return this;
    }

    isFull(): boolean {

        return IsFull(this);
    }

    isFirstUser(
        userID: string = this.userID
    ): boolean {

        return IsFirstUser(this, userID);
    }

    getUser(
        userID: string = this.userID
    ): UserInfoType {

        return GetUser(this, userID);
    }

    getUsers(): UserInfoType[] {

        return GetUsers(this);
    }

    getUserRef(
        userID: string = this.userID
    ): firebase.database.Reference {

        return GetUserRef(this, userID);
    }

    contains(
        userID: string = this.userID
    ): boolean {

        return Contains(this, userID);
    }

    join(
        userID: string = this.userID,
        userName: string = this.userName
    ): Promise<any> {

        return Join(this, userID, userName);
    }

    leave(
        userID: string = this.userID
    ): Promise<any> {

        return Leave(this, userID);
    }

    changeUserName(
        userName: string
    ): Promise<any> {

        return ChangeUserName(this, userName);
    }

    startUpdate(): this {

        let query = this.rootRef as firebase.database.Query;
        if (this.maxUsers > 0) {
            query = query.limitToFirst(this.maxUsers);
        }
        this.userList.startUpdate(query);
        return this;
    }

    stopUpdate(): this {

        this.userList.stopUpdate();
        return this;
    }
}