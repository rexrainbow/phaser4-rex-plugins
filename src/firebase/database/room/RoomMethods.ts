import {
    IRoom,
    UserInfoType
} from './IRoom';

export function IsInRoom(
    room: IRoom,
    roomID?: string
): boolean {

    return (roomID === undefined) ? (room.roomID !== undefined) : (room.roomID === roomID);
}

export function IsFull(
    room: IRoom
): boolean {

    return room.userList.isFull();
}

export function IsFirstUser(
    room: IRoom,
    userID: string = room.userID
): boolean {

    return room.userList.isFirstUser(userID);
}

export function GetUsers(
    room: IRoom
): UserInfoType[] {

    return room.userList.getUsers();
}