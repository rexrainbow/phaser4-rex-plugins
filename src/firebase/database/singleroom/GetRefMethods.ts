import * as firebase from 'firebase/app';
import { ISingleRoom } from './ISingleRoom';

export function GetRoomRef(
    room: ISingleRoom,
    childKey?: string
): firebase.database.Reference {

    let ref = room.rootRef;
    if (childKey) {
        ref = ref.child(childKey);
    }
    return ref;
};

export function GetUserListRef(
    room: ISingleRoom
): firebase.database.Reference {

    return GetRoomRef(room, 'users');
}

export function GetRoomDataPath(
    room: ISingleRoom,
    childKey?: string
): string {

    let path = room.rootPath;
    if (childKey) {
        path += `/${childKey}`;
    }
    return path;
}

export function GetUserListPath(
    room: ISingleRoom
): string {

    return GetRoomDataPath(room, 'users');
}

export function GetItemTablePath(
    room: ISingleRoom,
    key: string
): string {

    return `${GetRoomDataPath(room, 'tables')}/${key}`;
}