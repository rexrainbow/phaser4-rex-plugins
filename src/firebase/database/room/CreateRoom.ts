import {
    IRoom,
    ICreateRoomConfig, RoomFilterDataType, RoomInfoType
} from './IRoom.js';
import {
    GetRootRef, GetRoomRef, GetRoomAliveRef, GetRoomFilterRef, GetRoomMetadataRef,
    GetUserListPath
} from './GetRefMethods';
import { GetFilterString } from './RoomFilterMethods';
import { OnJoinRoom } from './OnJoinRoom';
import { GetRoomInfo } from './GetRoomInfo';

export function CreateRoom(
    room: IRoom,
    config: ICreateRoomConfig = {}
): Promise<RoomInfoType> {

    if (config.roomID == null) {
        config.roomID = GetRoomRef(room).push().key;
    }

    return RegisterRoom(room, config.roomID)
        .then(function () { // Create room
            return _CreateRoom(room, config);
        });
}

function RegisterRoom(
    room: IRoom,
    roomID: string
): Promise<any> {

    return GetRoomAliveRef(room, roomID)
        .transaction(function (value) {
            if (value === null) {  // Room is not existed, register success
                return true;
            }
            else {  // Room is existed, register fail
                return;    // Abort the transaction
            }
        });
}

function _CreateRoom(
    room: IRoom,
    {
        roomID,
        roomName = '',
        roomType = '',
        maxUsers = 0,
        presisted = false,
        door = 'open',
        join = true,
        filterData
    }: ICreateRoomConfig
): Promise<RoomInfoType> {

    let roomRef = GetRoomRef(room, roomID);
    let roomFilterRef = GetRoomFilterRef(room, roomID);
    let roomMetadataRef = GetRoomMetadataRef(room, roomID);

    // Remove room when creater is offline
    room.isRemoveRoomWhenLeft = !presisted;
    if (room.isRemoveRoomWhenLeft) {
        roomRef.onDisconnect().remove();
        roomFilterRef.onDisconnect().remove();
        roomMetadataRef.onDisconnect().remove();
    }

    const filter = GetFilterString(door, roomType);

    const d = {};

    // Room-filter
    const roomFilterData: RoomFilterDataType = {
        filter: filter,
        name: roomName
    };
    if (filterData) {
        roomFilterData.data = filterData;
    }
    d[`room-filters/${roomID}`] = roomFilterData;

    // Room-metadata
    const roomMetadata = {
        name: roomName,
        filter: filter,
        maxUsers: maxUsers,
        moderators: {}
    };
    roomMetadata.moderators[room.userID] = room.userName;
    d[`room-metadata/${roomID}`] = roomMetadata;

    return new Promise(function (resolve, reject) {
        if (join) {
            const promise = room.userList
                .setRootPath(GetUserListPath(room, roomID))
                .setMaxUsers(0) // Don't test max user count
                .join(); // Promise
            room.userList
                .setMaxUsers(maxUsers);
            return promise.then(resolve, reject);
        } else {
            return resolve();
        }
    })
        .then(function () {
            return GetRootRef(room).update(d)
        })
        .then(function () {
            room.isRoomCreator = true;
            if (join) {
                OnJoinRoom(room, roomID, roomName, roomType);
            }
            return Promise.resolve(GetRoomInfo(room));
        })
}