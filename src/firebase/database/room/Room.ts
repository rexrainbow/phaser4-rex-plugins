import * as firebase from 'firebase/app';
import {
    IRoom,
    IConfig, UserInfoType, RoomInfoType, RoomStateType, RoomFilterDataType,
    ICreateRoomConfig, ICreateRandomRoomCongfig, IJoinRoomConfig, IJoinRandomRoomConfig
} from './IRoom';
import { BaseEventEmitter } from '../../../utils/eventemitter/BaseEventEmitter';
import { OnlineUserList } from '../onlineuserlist';
import { CreateUserList } from './CreateUserList';
import { ItemList } from '../utils/itemlist';
import { CreateRoomList } from './CreateRoomList';
import { Broadcast } from '../broadcast';
import { CreateBroadcast } from './CreateBroadcast';
import { ItemTable } from '../itemtable'
import { CreateTables } from './CreateTables';
import { GetRoomInfo } from './GetRoomInfo';
import { IsInRoom, IsFull, IsFirstUser, GetUsers } from './RoomMethods';
import { CreateRoom } from './CreateRoom';
import { CreateRandomRoom } from './CreateRandomRoom';
import { JoinRoom } from './JoinRoom';
import { JoinRandomRoom } from './JoinRandomRoom';
import { LeaveRoom } from './LeaveRoom';
import { RemoveRoom } from './RemoveRoom';
import { KickUser } from './KickUser';
import { ChangeRoomState, OpenRoom, CloseRoom } from './ChangeRoomState';
import { ChangeFilterData } from './ChangeFilterData';
import { ChangeUserName } from './ChangeUserName';
import { ChangeRoomName } from './ChangeRoomName';
import { GetUserList } from './GetUserList';
import { GetRoomList } from './GetRoomList';
import { HasRoom } from './HasRoom';

export class Room extends BaseEventEmitter implements IRoom {
    database: firebase.database.Database;
    rootPath: string;
    rootRef: firebase.database.Reference;

    userInfo: UserInfoType;
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

    constructor({
        eventEmitter,
        root = '',
        userID = '',
        userName = '',
        broadcast = true,
        tables = false
    }: IConfig = {}) {

        super();

        // Event emitter
        this.setEventEmitter(eventEmitter);

        this.database = firebase.database()
        this.setRootPath(root);

        // User properties
        this.userInfo = { userID: '', userName: '' };
        this.setUser(userID, userName);
        // Room properties
        this.isRoomCreator = false;
        this.roomID = undefined;
        this.roomName = undefined;
        this.roomType = undefined;
        this.doorState = undefined;
        this.leftRoomFlag = false;
        this.isRemoveRoomWhenLeft = undefined;
        // User list
        this.userList = CreateUserList(this);
        // Room list
        this.roomList = CreateRoomList(this);
        // Broadcast
        this.broadcast = CreateBroadcast(this, broadcast);
        // Item tables
        this.tables = CreateTables(this, tables);
    }

    destroy() {
        var self = this;
        this
            .destroyEventEmitter()
            .leaveRoom()
            .then(function () {
                self.userList.destroy();
                self.userList = undefined;

                self.roomList.destroy();
                self.roomList = undefined;

                self.broadcast.destroy();
                self.broadcast = undefined;
            })
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

    getRoomInfo(roomID, roomName) {

        return GetRoomInfo(this, roomID, roomName);
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

    isInRoom(
        roomID?: string
    ): boolean {

        return IsInRoom(this, roomID);
    }

    isFull(
    ): boolean {

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

    get maxUsers() {

        return this.userList.maxUsers;
    }

    getTable(
        key: string
    ): ItemTable {

        return this.tables.get(key);
    }

    createRoom(
        config: ICreateRoomConfig
    ): Promise<RoomInfoType> {

        return CreateRoom(this, config);
    }

    createRandomRoom(
        config: ICreateRandomRoomCongfig = {}
    ): Promise<RoomInfoType> {

        return CreateRandomRoom(this, config);
    }

    joinRoom(
        config: IJoinRoomConfig
    ): Promise<RoomInfoType> {

        return JoinRoom(this, config);
    }

    joinRandomRoom(
        config: IJoinRandomRoomConfig = {}
    ): Promise<RoomInfoType> {

        return JoinRandomRoom(this, config);
    }

    leaveRoom(): Promise<RoomInfoType> {

        return LeaveRoom(this);
    }

    removeRoom(
        roomID: string = this.roomID
    ): Promise<RoomInfoType> {

        return RemoveRoom(this, roomID);
    }

    kickUser(
        userID: string
    ): Promise<any> {

        return KickUser(this, userID);
    }

    changeRoomState(
        roomState: RoomStateType,
        roomID: string = this.roomID
    ): Promise<any> {

        return ChangeRoomState(this, roomState, roomID);
    }

    openRoom(
        roomID: string = this.roomID
    ): Promise<any> {

        return OpenRoom(this, roomID);
    }

    closeRoom(
        roomID: string = this.roomID
    ): Promise<any> {

        return CloseRoom(this, roomID);
    }

    changeUserName(
        userName: string
    ): Promise<any> {

        return ChangeUserName(this, userName);
    }

    changeFilterData(
        filterData: { [key: string]: any },
        roomID: string = this.roomID
    ): Promise<any> {

        return ChangeFilterData(this, filterData, roomID);
    }

    changeRoomName(
        room: IRoom,
        roomName: string,
        roomID: string = room.roomID
    ): Promise<any> {

        return ChangeRoomName(this, roomName, roomID);
    }

    getUserList(
        roomID: string = this.roomID
    ): UserInfoType[] | Promise<UserInfoType[]> {

        return GetUserList(this, roomID);
    }

    getRoomList(
        roomType: string,
        roomState: RoomStateType
    ): Promise<RoomFilterDataType[]> {

        return GetRoomList(this, roomType, roomState);
    }

    HasRoom(
        roomID: string
    ): Promise<boolean> {

        return HasRoom(this, roomID);
    }
}