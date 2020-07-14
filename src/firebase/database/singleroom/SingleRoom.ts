import * as firebase from 'firebase/app';
import {
    ISingleRoom,
    IConfig,
    UserInfoType,
} from './ISingleRoom';
import { BaseEventEmitter } from '../../../utils/eventemitter/BaseEventEmitter';
import { OnlineUserList } from '../onlineuserlist';
import { CreateUserList } from './CreateUserList';
import { Broadcast } from '../broadcast';
import { CreateBroadcast } from './CreateBroadcast';
import { ItemTable } from '../itemtable'
import { CreateTables } from './CreateTables';
import { IsInRoom, IsFull, IsFirstUser, GetUsers } from './RoomMethods';
import { JoinRoom } from './JoinRoom';
import { LeaveRoom } from './LeaveRoom';
import { GetUserList } from './GetUserList';
import { KickUser } from './KickUser';
import { ChangeUserName } from './ChangeUserName';

export class SingleRoom extends BaseEventEmitter implements ISingleRoom {
    database: firebase.database.Database;
    rootPath: string;
    rootRef: firebase.database.Reference;

    userInfo: UserInfoType;
    userList: OnlineUserList;
    leftRoomFlag: boolean;

    broadcast: Broadcast;
    tables: Map<string, ItemTable>;

    constructor({
        eventEmitter,
        root = '',
        userID = '',
        userName = '',
    }: IConfig = {}) {

        const config = arguments[0] as IConfig;

        super();

        // Event emitter
        this.setEventEmitter(eventEmitter);

        this.database = firebase.database();
        this.setRootPath(root);

        // User properties
        this.userInfo = { userID: '', userName: '' };
        this.setUser(userID, userName);
        // Room properties
        this.leftRoomFlag = false;
        // User list
        this.userList = CreateUserList(this, config);
        // Broadcast
        this.broadcast = CreateBroadcast(this, config);
        // Item tables
        this.tables = CreateTables(this, config);
    }

    shutdown() {
    }

    destroy() {
        this.shutdown();
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


    isInRoom(): boolean {

        return IsInRoom(this);
    }

    isFull(): boolean {
        return IsFull(this);
    }

    isFirstUser(
        userID: string = this.userID
    ): boolean {

        return IsFirstUser(this, userID);
    }

    getUsers(): UserInfoType[] {

        return GetUsers(this);
    }

    get maxUsers(): number {
        return this.userList.maxUsers;
    }

    getTable(
        key: string
    ): ItemTable {

        return this.tables.get(key);
    }

    joinRoom(): Promise<any> {

        return JoinRoom(this);
    }

    leaveRoom(): Promise<any> {

        return LeaveRoom(this);
    }

    getUserList(): UserInfoType[] {

        return GetUserList(this);
    }

    kickUser(
        userID: string
    ): Promise<any> {

        return KickUser(this, userID);
    }

    changeUserName(
        userName: string
    ): Promise<any> {

        return ChangeUserName(this, userName);
    }
}