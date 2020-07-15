import {
    IRoom,
    IJoinRoomConfig, RoomMetadataType, RoomInfoType
} from './IRoom';
import { GetRoomMetadataRef, GetUserListPath } from './GetRefMethods';
import { GetRoomType, GetRoomState } from './RoomFilterMethods';
import { LeaveRoom } from './LeaveRoom'
import { OnJoinRoom } from './OnJoinRoom';
import { GetRoomInfo } from './GetRoomInfo';

export function JoinRoom(
    room: IRoom,
    {
        leftThenJoin = true,
        roomID
    }: IJoinRoomConfig
): Promise<RoomInfoType> {

    if (leftThenJoin) {
        return LeaveRoom(room)
            .then(function () {
                return _JoinRoom(room, roomID);
            })
    } else {
        return _JoinRoom(room, roomID);
    }
}

function _JoinRoom(
    room: IRoom,
    roomID: string
): Promise<RoomInfoType> {

    if (roomID == null) {
        return Promise.reject(GetRoomInfo(room, roomID, ''));
    }

    room.isRemoveRoomWhenLeft = false;
    return GetOpenedRoomMetadata(room, roomID)
        .then(function (metadata: RoomMetadataType) {
            return room.userList
                .setRootPath(GetUserListPath(room, roomID))
                .setMaxUsers(metadata.maxUsers)
                .join()
                .then(function () {
                    return Promise.resolve(metadata)
                })
        })
        .then(function (metadata) {
            OnJoinRoom(room, roomID, metadata.name, GetRoomType(metadata.filter));
            return Promise.resolve(GetRoomInfo(room));
        })
}

function GetOpenedRoomMetadata(
    room: IRoom,
    roomID: string
): Promise<RoomMetadataType> {

    return GetRoomMetadataRef(room, roomID).once('value')
        .then(function (snapshot) {
            let roomMetadata = snapshot.val() as RoomMetadataType;
            if (!IsRoomOpened(room, roomMetadata)) {
                return Promise.reject();
            } else {
                return Promise.resolve(roomMetadata);
            }
        });
}

function IsRoomOpened(
    room: IRoom,
    roomMetadata: RoomMetadataType
): boolean {

    if (roomMetadata == null) {
        return false;
    }

    if (GetRoomState(roomMetadata.filter) === 'closed') {
        return false;
    }

    const userID = room.userID;
    if (roomMetadata.moderators[userID]) {
        return true;
    }

    switch (roomMetadata.permission) {
        case 'blocklist':
            const blockList = roomMetadata['blocklist'];
            return !(blockList && blockList[userID]);

        case 'allowlist':
            const allowList = roomMetadata['allowlist'];
            return allowList && allowList[userID];

        default: // 'anyone'
            return true;
    }
}