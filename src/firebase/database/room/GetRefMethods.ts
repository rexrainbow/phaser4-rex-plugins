import * as firebase from 'firebase/app';
import {
    IRoom,
    RoomStateType
} from './IRoom';
import { GetFilterString } from './RoomFilterMethods';

export function GetRootRef(
    room: IRoom,
    childKey?: string
): firebase.database.Reference {

    let ref = room.rootRef;
    if (childKey) {
        ref = ref.child(childKey);
    }
    return ref;
};

export function GetRoomRef(
    room: IRoom,
    roomID?: string,
    childKey?: string
): firebase.database.Reference {

    let ref = GetRootRef(room, 'rooms');
    if (roomID !== undefined) {
        ref = ref.child(roomID);
        if (childKey !== undefined) {
            ref = ref.child(childKey);
        }
    }
    return ref;
}

export function GetRoomAliveRef(
    room: IRoom,
    roomID: string
): firebase.database.Reference {

    return GetRoomRef(room, roomID, 'alive');
}

export function GetUserListRef(
    room: IRoom,
    roomID: string
): firebase.database.Reference {

    return GetRoomRef(room, roomID, 'users');
};

export function GetRoomFilterRef(
    room: IRoom,
    roomID?: string
): firebase.database.Reference {

    let ref = GetRootRef(room, 'room-filters');
    if (roomID !== undefined) {
        ref = ref.child(roomID);
    }
    return ref;
};

export function GetRoomMetadataRef(
    room: IRoom,
    roomID: string
): firebase.database.Reference {

    let ref = GetRootRef(room, 'room-metadata');
    if (roomID !== undefined) {
        ref = ref.child(roomID);
    }
    return ref;
};

// TODO: ??
export function GetUserDataRef(
    room: IRoom,
    userID?: string
): firebase.database.Reference {

    let ref = GetRootRef(room, 'user-data');
    if (userID !== undefined) {
        ref = ref.child(userID);
    }
    return ref;
};

export function GetRoomDataPath(
    room: IRoom,
    roomID: string,
    childKey?: string
): string {

    let path = `${room.rootPath}/rooms/${roomID}`;
    if (childKey) {
        path += `/${childKey}`;
    }
    return path;
};

export function GetUserListPath(
    room: IRoom,
    roomID: string
): string {

    return GetRoomDataPath(room, roomID, 'users');
};

export function GetItemTablePath(
    room: IRoom,
    roomID: string,
    key: string
): string {

    return `${GetRoomDataPath(room, roomID, 'tables')}/${key}`;
};

export function GetRoomListQuery(
    room: IRoom,
    roomType?: string,
    roomState: RoomStateType = 'open'
): firebase.database.Query {

    let query: firebase.database.Query = GetRoomFilterRef(room);
    query = query.orderByChild('filter');
    if (roomType === undefined) {
        query = query.startAt(roomState).endAt(`${roomState}~`);
    } else {
        query = query.equalTo(GetFilterString(roomState, roomType));
    }
    return query;
};